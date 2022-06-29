import BaseRepo from './base-repo'
import createModel, { ICustomerModel } from '@models/customer'
import * as mongoose from 'mongoose'
import * as uuid from 'uuid'
import { DateTime } from 'luxon'
import debug = require('debug')
const log = debug('kaira.data-services:repositories:customer')

export default class CustomerRepo extends BaseRepo<ICustomerModel> {
  constructor(connection: mongoose.Connection) {
    super(createModel(connection))
  }

  async updateCustomer(data: any): Promise<ICustomerModel | null> {
    const id = data.id ? mongoose.Types.ObjectId.createFromHexString(data.id) : undefined
    delete data.id

    if (data.username === undefined || data.username === null || data.username === ``) {
      delete data.username
    }

    if (
      data.previousHashedPassword === undefined ||
      data.previousHashedPassword === null ||
      data.previousHashedPassword === ``
    ) {
      delete data.previousHashedPassword
    }

    if (data.zoneName === undefined || data.zoneName === null || data.zoneName === ``) {
      delete data.zoneName
    }

    if (
      data.hashedPassword !== undefined &&
      data.hashedPassword !== null &&
      data.hashedPassword !== ``
    ) {
      const customer = await this.model.findOne({
        $or: [{ _id: id }, { email: data.email }],
      })
      if (customer) {
        data.previousHashedPassword = customer.hashedPassword
      }
    } else {
      delete data.hashedPassword
    }

    return this.model.findOneAndUpdate({ $or: [{ _id: id }, { email: data.email }] }, data, {
      new: true,
    })
  }
  
  async findCustomerByEmail(email: string): Promise<ICustomerModel | null> {
    return this.model.findOne({ email })
  }
  async countAdmin(): Promise<number> {
    return this.model.count({ isSuperAdmin: true })
  }
  
  async findCustomerByEmails(emails: string[]): Promise<ICustomerModel[]> {
    return this.model.find({ email: { $in: emails } })
  }

  async findCustomerByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<ICustomerModel | null> {
    return this.model.findOne({ email, hashedPassword: password })
  }

  async countCreatedCustomer(date: string): Promise<number> {
    const reportDate = DateTime.fromFormat(date, 'yyyy-MM-dd')
    return this.model.count({
      createdAt: {
        $gte: reportDate,
        $lt: reportDate.plus({ days: 1 }),
      }
    })
  }

  async countOnlineCustomer(fromDate: Date, toDate: Date): Promise<number> {
    return this.model.count({
      lastOnlineAt: {
        $gte: fromDate,
        $lt: toDate,
      }
    })
  }
  
}
