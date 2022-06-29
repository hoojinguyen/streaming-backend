import * as _ from 'lodash'
import debug = require('debug')
import ISocketBroadcaster from './socket-broadcaster.service.d'
import * as initEmitter from 'socket.io-emitter'
import { supporterService, customerService, peerService } from './index'
import { GROUPS, TYPES } from '../../constants/index'
const log = debug('streaming:services:socket-broadcaster')
const opts = {
  host: process.env.REDIS_HOST || `redis`,
  port: Number.parseInt(process.env.REDIS_PORT || `6379`, 10) || 6379,
}
const emitter = initEmitter(null, opts)

export default class SocketBroadcaster implements ISocketBroadcaster {
  async sendMessageToPeer(peerId: string, msg?: any): Promise<void> {    
    const lastActiveSession = await peerService.getLastActiveSession(peerId)
    lastActiveSession && emitter && emitter.to(lastActiveSession.socketId).emit('message', msg)   
  }

  async broadcastToSupportersByCustomerId(customerId: string, msg?: any): Promise<void> {
    const onlineSupporters = await supporterService.getOnlineSupporters(customerId) || []
    log('onlineSupporters: ', onlineSupporters)
    // Find all supporters
    if (_.isEmpty(onlineSupporters)) return    

    // Get online list
    for (const supporter of onlineSupporters) {
      const activeSession = await customerService.getLastActiveSession(supporter._id)
      log('activeSession: ', activeSession)
      activeSession && emitter && emitter.to(activeSession.socketId).emit('message', msg)    
    }
    
  }  

}
