import IPeerService from './peer.service.d'
import { IPeerModel } from '../models/peer'
import { peerRepo, peerSessionRepo } from '../repositories/index'
import debug = require('debug')
import uuid = require('uuid')
import * as _ from 'lodash'
import { ERROR } from '../../constants/index'
import { IPeerSessionModel } from '../models/peer-session'
const log = debug('streaming:services:customer')

export default class PeerService implements IPeerService {
  getLastActiveSession(peerId: string): Promise<IPeerSessionModel | null> {
    return peerSessionRepo.findOne({
      peerId,
      isActive: true,
    })
  }

  createPeerSession(customerId: string, peerId: string, socketId: string, data?: any): Promise<IPeerSessionModel|null> {
    return peerSessionRepo.create({
      customerId,
      peerId,
      socketId,
      ...data
    } as IPeerSessionModel)
  }

  async createNewPeer(customerId: string, peerInfo: any): Promise<IPeerModel | null> {
    if (_.isEmpty(customerId)) {
      throw new Error(ERROR.COMMON.MISSARGUMENT)
    }   
    
    try {
      const newPeer = await peerRepo.create({    
        customerId,
        isOnline: false
      } as IPeerModel)                  
      return newPeer
    } catch (ex) {
      const errorStack = _.get(ex, 'stack')
      log('err: ', errorStack)
    }    
    return null
  }  
  
  updatePeer(peerId: string, isOnline?: boolean | undefined, name?: string | undefined, gender?: string | undefined, email?: string | undefined): Promise<IPeerModel | null> {
    let updatedFields = {}    
    if (!_.isUndefined(isOnline)) updatedFields = {...updatedFields, isOnline}
    if (!_.isUndefined(name)) updatedFields = {...updatedFields, name}
    if (!_.isUndefined(gender)) updatedFields = {...updatedFields, gender}
    if (!_.isUndefined(email)) updatedFields = {...updatedFields, email}
    return peerRepo.updateFields(peerRepo.toObjectId(peerId), updatedFields)
  }

}
