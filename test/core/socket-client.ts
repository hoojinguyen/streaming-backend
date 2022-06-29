import * as _ from 'lodash'
import * as io from 'socket.io-client'
import { Socket } from 'socket.io'
import { delaySynchronously } from '../../src/core/utils/time'
import debug = require('debug')
const log = debug('streaming:backend:test:socket-client')
const options = {
  'transports': ['websocket'],
  'force new connection': true,
  'forceNew': true, 
}

export default class SocketClient {

  socket: any
  receivedMessages: any[] = []

  isListening: boolean = false

  constructor(host: string, path?: string, token?: string, queries?: any) {
    log('init SocketClient: ', host)
    this.socket = io(host, {
      ...options,
      path,
      query: {
        token,
        ...queries
      }
    })
    
    this.socket.on('connect', () => {
      this.isListening = true
      log('connect')
      log('isListening: ', this.isListening)
    })

    this.socket.on('message', (msg) => {
      log('message: ', JSON.stringify(msg))
      this.receivedMessages.push(msg)
      log('totalMessages: ', _.size(this.receivedMessages))
    })
  }  

  disconnect() {
    this.socket && this.socket.close()
  }

  async sendMessage(message: any, delayAfterFinish?: number): Promise<void> {
    this.socket.send(message)
    delayAfterFinish && await delaySynchronously(delayAfterFinish)
  }

  getLastReceivedMessage() {
    log('getLastReceivedMessage:', this.countReceivedMessage())
    return !_.isEmpty(this.receivedMessages) ? _.last(this.receivedMessages) : null
  }
  countReceivedMessage() {
    return _.size(this.receivedMessages)
  }
}