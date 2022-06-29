import { IStreamModel } from '../models/stream'

export default interface IStreamService {
  
  createNewStream(customerId: string, peerId?: string, supporterId?: string): Promise<IStreamModel|null>

  updateStream(streamId: string, peerId?: string, supporterId?: string): Promise<IStreamModel|null>

  stopStream(streamId: string): Promise<IStreamModel|null>

  getStream(streamId: string): Promise<IStreamModel|null>

}