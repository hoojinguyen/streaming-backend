import test from 'ava'
import { Server } from '../../../../src/core/server'
import * as _ from 'lodash'
import clearData from '../../commons/clear-data'
import { runAfter, delaySynchronously } from '../../../../src/core/utils/time'
import debug = require('debug')
import SocketClient from '../../socket-client'
import createUser from '../../commons/create-user'
import generatePeer from '../../commons/generate-peer'
import assignSupporter from '../../commons/assign-supporter'
import { GROUPS, TYPES } from '../../../../src/constants/index'
const log = debug('streaming:backend:test:handlers:websocket:connect')
const server = new Server(`${process.env.SERVER_PORT_TEST}`)
const socketUrl = `http://localhost:${process.env.SERVER_PORT_TEST}`
const WAITING_TIME = 6000
const TIME_OUT_FOR_TEST_CASE = 2000
server.start()

test.before('clear data', async t => {
  log('test.before')
  await clearData()
})

test.after('clear data & close connection', async t => {
  log('test.after')
  server.close()
})

test('connect to stream & join room(streamId)', async (t) => {

  // Create users: user01, user02, user03, user 04
  const userInfo01 = await createUser(server)
  const userInfo02 = await createUser(server)
  const userInfo03 = await createUser(server)
  const userInfo04 = await createUser(server)
  log('userInfo01: ', userInfo01)
  // Assign someone as supporters:
  // - User01: Admin
  // - Supporters: User02, User03 are supporters for User01
  // Assign someone as supporters.
  await assignSupporter(server, userInfo01, userInfo02)
  await assignSupporter(server, userInfo01, userInfo03)

  // Each peer has information: Which Website? Which customerId? Token for this customerId.
  // Peer:
  // - Get peerInfo.
  // - Call API for checking if there is any supporters available.
  // - Only open WebSocket after have PeerInfo (Performance reason)
  const peer01 = await generatePeer(server, userInfo01)  
  
  // - Open WebSocket
  const peer01Socket = new SocketClient(socketUrl, '/peer', _.get(userInfo01, 'widgetKey'), {
    widgetId: _.get(userInfo01, '_id'),
    peerId: _.get(peer01, '_id'),
  })
  
  const userInfo01Socket = new SocketClient(socketUrl, '/admin', _.get(userInfo01, 'token'))

  // Client call for support  
  await peer01Socket.sendMessage({
    group: GROUPS.PEER,
    type: TYPES.PEER.REQUEST_CALL,
    payload: {}
  }, 1000)
  
  // Supporter accepts the call
  await userInfo01Socket.sendMessage({
    group: GROUPS.PEER,
    type: TYPES.PEER.ACCEPT_CALL,
    payload: {
      callId: _.get(userInfo01Socket.getLastReceivedMessage(), 'payload._id')
    }
  }, 1000)
  
  // Check data
  await runAfter(WAITING_TIME, (done) => {        
    // Check user01 is supporting someone now.

    // Check received message for peer, supporter: Number of messages, format.
    t.pass()
    done && done()
  }, TIME_OUT_FOR_TEST_CASE, () => {
    t.fail('testcase timeout')
  })  
})
