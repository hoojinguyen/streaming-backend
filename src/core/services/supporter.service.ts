import * as _ from 'lodash'
import { ERROR } from '../../constants/index'
import ISupporterService from './supporter.service.d'
import { ISupporterModel } from '../models/supporter'
import { supporterRepo, customerRepo } from '../repositories/index'
import { RoleType } from '../../constants/stream-type'
import { ICustomerModel } from '../models/customer'
import { customerService } from './index'
import debug = require('debug')
const log = debug('streaming:services:supporter')

export default class SupporterService implements ISupporterService {
  async getOnlineSupporters(adminId: string): Promise<ISupporterModel[] | null> {
    const supporters = await this.getSupporters(adminId)
    return _.filter(supporters, [
      'isOnline', true
    ])
  }
  async getOfflineSupporters(adminId: string): Promise<ISupporterModel[] | null> {
    const supporters = await this.getSupporters(adminId)
    return _.filter(supporters, [
      'isOnline', false
    ])
  }
  
  async getSupporters(adminId: string): Promise<ISupporterModel[] | null> {
    log('getSupporters: ', adminId)
    try {
      const supporters = await supporterRepo.findAll(adminId)
      const populatedSupporters: any[] = []
      for (const supporter of supporters) {
        const poplulatedData = await customerService.getAccountById(supporter.supporterId)        
        poplulatedData && populatedSupporters.push(poplulatedData)
      }
      return populatedSupporters
    } catch (ex) {
      log(ex)
      throw new Error(ex)            
    }    
  }  
  
  async addSupporter(adminId: string, email: string): Promise<ISupporterModel | null> {
    
    log('add Supporter: ', email)
    try {
      const customerAccount: ICustomerModel|null = await customerRepo.findCustomerByEmail(email)
      if (!customerAccount) {      
        throw new Error(ERROR.CUSTOMER.INVALID_EMAIL)
      }                  
      const newSupporter = await supporterRepo.create({
        adminId,
        supporterId: customerAccount._id,
        roles: adminId === customerAccount._id.toString()
          ? [RoleType.ADMIN, RoleType.SUPPORTER] 
          : [RoleType.SUPPORTER]
      } as ISupporterModel)
      return newSupporter
    } catch (ex) {
      log(ex)
      throw new Error(ex)      
    }    
  }
  
  findAvailableSupporters(adminId: string): Promise<ISupporterModel[]> {
    throw new Error('Method not implemented.')
  }
  
}
