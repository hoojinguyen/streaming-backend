import { ICustomerModel } from '../models/customer'
import { ICustomerSessionModel } from '../models/customer-session'
export default interface ICustomerService {
  createNewAccount(email: string, hashedPassword: string, zoneName?: string): Promise<ICustomerModel|null>
  findExistingAccount(email: string, hashedPassword?: string): Promise<ICustomerModel|null>
  getAccountById(accountId: string): Promise<ICustomerModel|null>
  updateOnlineStatus(accountId: string, isOnline: boolean): Promise<ICustomerModel|null>
  createNewSession(accountId: string, socketId: string, data?: any): Promise<ICustomerSessionModel|null>
  getLastActiveSession(accountId: string): Promise<ICustomerSessionModel|null>
}