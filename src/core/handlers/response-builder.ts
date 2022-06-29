import * as _ from 'lodash'
import { ICustomerModel } from '../models/customer'

export function customerWithoutPassword(customer: ICustomerModel): any {  
  return {
    zoneName: customer.zoneName,
    isVerifiedEmail: customer.isVerifiedEmail,
    isOnline: customer.isOnline,
    isSuperAdmin: customer.isSuperAdmin,
    _id: customer._id,
    email: customer.email,
    lastOnlineAt: customer.lastOnlineAt,
    createdAt: customer.createdAt,
    updatedAt: customer.updatedAt,
    widgetKey: customer.widgetKey
  }
}