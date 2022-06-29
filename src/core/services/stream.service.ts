import * as _ from 'lodash'
import IStreamService from './stream.service.d'
import { ERROR } from '../../constants/index'
import { streamRepo } from '../repositories/index'
import { IStreamModel } from '../models/stream'
import debug = require('debug')
const log = debug('streaming:services:stream')

export default class StreamService implements IStreamService {
  getStream(streamId: string): Promise<IStreamModel | null> {
    return streamRepo.findById(streamId)
  }

  async createNewStream(customerId: string, peerId?: string | undefined, supporterId?: string | undefined): Promise<IStreamModel|null> {
    log('customerId: ', customerId)
    log('peerId: ', peerId)
    log('supporterId: ', supporterId)
    try {      
      if (!customerId || (!peerId && supporterId)) {      
        throw new Error(ERROR.STREAM.MISSARGUMENT)
      }

      return streamRepo.create({
        customerId,
        supporterId,
        peerId,
      } as IStreamModel)

    } catch (ex) {
      log(ex)
      throw new Error(ex)      
    }      
  }  
  
  async updateStream(streamId: string, peerId?: string | undefined, supporterId?: string | undefined): Promise<IStreamModel | null> {
    let updatedFields = {}
    if (!_.isUndefined(peerId)) updatedFields = {...updatedFields, peerId}
    if (!_.isUndefined(supporterId)) updatedFields = {...updatedFields, supporterId}
    await streamRepo.updateFields(streamRepo.toObjectId(streamId), updatedFields)
    return streamRepo.findById(streamId)
  }
  
  stopStream(streamId: string): Promise<IStreamModel|null> {
    throw new Error('Method not implemented.')
  }
    
}
