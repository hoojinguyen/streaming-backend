export default interface ISocketBroadcaster {
  broadcastToSupportersByCustomerId(customerId: string, msg?: any): Promise<void>

  sendMessageToPeer(peerId: string, msg?: any): Promise<void>
  
}