import { ICustomerModel } from '@models/customer'
import { customerRepo } from '../repositories'
import ICustomerService from './customer.service.d'
import * as _ from 'lodash'
import { ERROR } from '../../constants/index'
import { supporterService } from './index'
import generateWidgetToken from '../utils/generateWidgetToken'
import { customerSessionRepo } from '../repositories/index'
import { ICustomerSessionModel } from '../models/customer-session'
import debug = require('debug')
const log = debug('streaming:services:customer')

export default class CustomerService implements ICustomerService {
  getLastActiveSession(accountId: string): Promise<ICustomerSessionModel | null> {
    return customerSessionRepo.findOne({
      customerId: accountId,
      isActive: true,
    })
  }
  createNewSession(accountId: string, socketId: string, data?: any): Promise<ICustomerSessionModel|null> {    
    return customerSessionRepo.create({
      customerId: accountId,
      socketId,
      ...data
    } as ICustomerSessionModel)
  }  

  updateOnlineStatus(accountId: string, isOnline: boolean): Promise<ICustomerModel | null> {
    log('updateOnlineStatus: ', isOnline)
    return customerRepo.updateFields(customerRepo.toObjectId(accountId), {
      isOnline,
      lastOnlineAt: new Date()
    })
  }
  getAccountById(accountId: string): Promise<ICustomerModel | null> {
    log('getAccountById:', accountId)
    return customerRepo.findById(accountId)
  }

  async createNewAccount(email: string, hashedPassword: string, zoneName?: string): Promise<ICustomerModel | null> {    
    // Check valid parameters
    if (_.isEmpty(email) || _.isEmpty(hashedPassword)) {
      throw new Error(ERROR.CUSTOMER.MISSARGUMENT)
    }   
    
    try {
      const newCustomer = await customerRepo.create({
        email,
        hashedPassword,   
        zoneName
      } as ICustomerModel)

      await supporterService.addSupporter(newCustomer._id.toString(), email)

      await customerRepo.updateFields(newCustomer._id, {
        widgetKey: generateWidgetToken(newCustomer._id.toString(), email)
      })

      return customerRepo.findById(newCustomer._id.toString())

    } catch (ex) { 
      const errorStack = _.get(ex, 'stack')
      if (errorStack && ex.toString().indexOf('duplicate') >= 0) throw new Error(ERROR.CUSTOMER.ALREGISTERED)
      return null
    }    
  }

  findExistingAccount(email: string, hashedPassword?: string): Promise<ICustomerModel | null> {    
    return hashedPassword
      ? customerRepo.findCustomerByEmailAndPassword(email, hashedPassword) 
      : customerRepo.findCustomerByEmail(email)    
  }
}
