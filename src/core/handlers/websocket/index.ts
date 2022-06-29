import requireAll = require('require-all')
import debug = require('debug')
import socketio from 'socket.io'
const log = debug('streaming:handler:websocket')

export interface IAuthInfo {
  isAdmin?: boolean
  accountId?: string
  widgetId?: string
  isPeer?: boolean
  peerId?: string
}
export interface IWebSocketHandler {
  processMessage(socket: socketio.Socket, msg: any, authInfo?: IAuthInfo)
}

export class WebSocketHandler {
  handlers: IWebSocketHandler[]

  constructor() {
    this.handlers = []
    requireAll({
      dirname: __dirname,
      filter: (fileName: string) => fileName.indexOf('index') === -1,
      resolve: module => {
        log(`load handler: ${module.name}`)
        this.handlers.push(module.default)
      },
    })
  }

  processMessage(socket: socketio.Socket, msg: any, authInfo?: IAuthInfo) {
    this.handlers.forEach(handler => {
      handler && handler.processMessage && handler.processMessage(socket, msg, authInfo)
    })
  }
}

const webSocketHandler = new WebSocketHandler()
export default webSocketHandler 
