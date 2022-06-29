import { ICustomerModel } from '@models/customer'
import { customerRepo } from '../repositories'
import ICustomerService from './customer.service.d'
import AbstractMockService from './abstract-mock.service'
import IMockService from './mock.service.d'
import CustomerService from './customer.service'
import { ICustomerSessionModel } from '../models/customer-session'
const customerService = new CustomerService()
export default class MockCustomerService extends AbstractMockService implements ICustomerService, IMockService {
  getLastActiveSession(accountId: string): Promise<ICustomerSessionModel | null> {
    const mockData = this.popMock()    
    if (mockData) return mockData
    return customerService.getLastActiveSession(accountId)
  }

  createNewSession(accountId: string, socketId: string, data?: any): Promise<ICustomerSessionModel|null> {
    const mockData = this.popMock()    
    if (mockData) return mockData
    return customerService.createNewSession(accountId, socketId, data)
  }
  updateOnlineStatus(accountId: string, isOnline: boolean): Promise<ICustomerModel | null> {
    const mockData = this.popMock()    
    if (mockData) return mockData
    return customerService.updateOnlineStatus(accountId, isOnline || false)
  }

  getAccountById(accountId: string): Promise<ICustomerModel | null> {
    const mockData = this.popMock()    
    if (mockData) return mockData
    return customerService.getAccountById(accountId)
  }
  createNewAccount(email: string, hashedPassword: string, zoneName?: string): Promise<ICustomerModel | null> {
    const mockData = this.popMock()    
    if (mockData) return mockData
    return customerService.createNewAccount(email, hashedPassword, zoneName)
  }

  findExistingAccount(email: string, hashedPassword?: string): Promise<ICustomerModel | null> {
    const mockData = this.popMock()    
    if (mockData) return mockData
    return customerService.findExistingAccount(email, hashedPassword)
  }
  
}