import * as _ from 'lodash'
import { IWebSocketHandler, IAuthInfo } from './index'
import { GROUPS, TYPES, ERROR } from '../../../constants/index'
import debug = require('debug')
import socketio from 'socket.io'
import { getStreamToken, sendResponse } from '../../utils/socket-utils'
import { streamService, socketBroadcaster, peerService } from '../../services/index'
const log = debug('streaming:handler:websocket:peer')

export class PeerHandler implements IWebSocketHandler {
  processMessage(socket: socketio.Socket, msg: any, authInfo?: IAuthInfo) {
    log('processMessage:', msg)
    if (msg.group !== GROUPS.PEER || !msg.group) return
    switch (msg.type) {
      case TYPES.PEER.REQUEST_CALL:    
        this.requestCall(socket, msg, authInfo)
        break
      case TYPES.PEER.ACCEPT_CALL:        
        this.acceptCall(socket, msg, authInfo)
        break        
      default:
        log('No handler for message: ' + JSON.stringify(msg))
    }
  }

  async requestCall(socket: socketio.Socket, msg: any, authInfo?: IAuthInfo) {    
    // Create new stream (call) - Status (new).
    if (!authInfo) return
    const { widgetId, peerId, accountId} = authInfo    
    log('widgetId:', widgetId)
    log('peerId:', peerId)
    log('accountId:', accountId)
    if (widgetId && (peerId || accountId)) {
      const newCall = await streamService.createNewStream(widgetId, peerId, accountId)
      log('new call:', newCall)

      // Broadcast to all supporters belong to that team.
      const teamId = widgetId || accountId
      
      teamId && await socketBroadcaster.broadcastToSupportersByCustomerId(teamId, {
        group: GROUPS.SUPPORTER,
        type: TYPES.SUPPORTER.NOTIFY_NEW_CALL,
        payload: newCall
      })

      // Send notification to all offline supporter.

      // Create a redis job to check status of that stream.
      // + Notify user when there is no supporter accept the call.    
    }
            
  }

  async acceptCall(socket: socketio.Socket, msg: any, authInfo?: IAuthInfo) {    
    log('acceptCall: ', msg)    
    const streamId = _.get(msg, 'payload.callId')
    const accountId = _.get(authInfo, 'accountId')
    log('streamId: ', streamId)
    log('accountId: ', accountId)    
    
    if (!accountId || !streamId) return     

    // get Stream info
    const waitingCall = await streamService.getStream(streamId)
    log('waitingCall: ', waitingCall)    
    try {
      if (_.get(waitingCall, 'supporterId')) {
        log('This call has already taked care by another supporter')
        socket.emit('message', {
          group: GROUPS.PEER,
          type: TYPES.PEER.ACCEPT_CALL,
          payload: {
            error: ERROR.SUPPORTER.COULD_NOT_ACCEPT_CALL_BECAUSE_TAKEN_BY_OTHER,
            call: waitingCall
          }
        })
      } else {        
        const acceptedCall = await streamService.updateStream(streamId, undefined, accountId)
        log('Accept call:', acceptedCall)
        
        log('Send response to supporter')
        socket.emit('message', {
          group: GROUPS.PEER,
          type: TYPES.PEER.ACCEPT_CALL,
          payload: acceptedCall
        })

        log('Update information for peer')
        const peerId = _.get(waitingCall, 'peerId')
        if (!peerId) return        
        socketBroadcaster.sendMessageToPeer(peerId, {
          group: GROUPS.PEER,
          type: TYPES.PEER.ACCEPT_CALL,
          payload: {
            call: acceptedCall
          }
        })
      }
    } catch (ex) {
      log(ex)
    }
    
  }

}

export default new PeerHandler()
