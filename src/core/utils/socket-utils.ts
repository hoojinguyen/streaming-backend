import * as socketio from 'socket.io'

export function getStreamToken(socket: socketio.Socket): any {
  const tokenData = socket[`decoded_token`]
  return tokenData
}

export function sendResponse(socket: socketio.Socket, msg: any, payload: any): any {
  socket && socket.send({
    group: msg.group,
    type: msg.type,
    payload
  })
}