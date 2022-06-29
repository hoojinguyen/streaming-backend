import { Server } from '../../../src/core/server'
import * as uuid from 'uuid'
import * as md5 from 'md5'
import * as _ from 'lodash'
import { StreamType } from '../../../src/constants/stream-type'
const request = require('supertest')
import debug = require('debug')
const log = debug('streaming:backend:test:common:join-stream')

export default async function joinStream(server: Server, streamId: string, peerId: string, peerKey: string) {
  log('streamId: ', streamId)
  log('peerId: ', peerId)
  log('peerKey: ', peerKey)
  const response = await request(server.getExpressApp())
    .post('/stream/join_stream')
    .set('Content-Type', 'application/json')
    .send({ 
      streamId, peerId, peerKey      
    })
  return response.body  
}