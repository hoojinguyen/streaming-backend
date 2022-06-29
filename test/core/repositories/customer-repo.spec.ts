import test from 'ava'
import { customerRepo } from '../../../src/core/repositories'
import * as uuid from 'uuid'
import * as md5 from 'md5'
import { hashPassword } from '../../../src/core/utils/encrypter'
import { ICustomerModel } from '../../../src/core/models/customer'
import debug = require('debug')
const log = debug('streaming:backend:test:respositories:customer')

test('add new record', async t => {
  try {
    const username = uuid()
    const createdCustomer = await customerRepo.create({
      email: `${username}@gmail.com`,
      hashedPassword: hashPassword(username)    
    } as ICustomerModel)
    log('createdCustomer: ', createdCustomer)
    t.true(createdCustomer !== null)
    t.pass()
  } catch (ex) {
    log(ex)
    t.fail()
  }  
})

test('add update record', async t => {
  t.pass()
})