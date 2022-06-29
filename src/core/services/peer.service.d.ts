import { IPeerModel } from '../models/peer'
import { IPeerSessionModel } from '../models/peer-session'
export default interface IPeerService {
  createNewPeer(customerId: string, peerInfo: any): Promise<IPeerModel|null>
  updatePeer(peerId: string, isOnline?: boolean, name?: string, gender?: string, email?: string): Promise<IPeerModel|null>
  createPeerSession(customerId: string, peerId: string, socketId: string, data?: any): Promise<IPeerSessionModel|null>
  getLastActiveSession(peerId: string): Promise<IPeerSessionModel|null>
}