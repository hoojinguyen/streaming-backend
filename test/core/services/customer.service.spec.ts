import test from 'ava'
import * as uuid from 'uuid'
import * as md5 from 'md5'
import * as _ from 'lodash'
import debug from 'debug'
import { customerService } from '../../../src/core/services'
import { hashPassword } from '../../../src/core/utils/encrypter'
import { ERROR } from '../../../src/constants/index'
const log = debug('streaming:backend:test:respositories:customer')

test('create new customer', async t => {
  try {    
    const email = `${uuid()}@gmail.com`
    const hashedPassword = hashPassword(md5('12345678'))
    log('email: ', email)
    log('hashedPassword: ', hashedPassword)
    const createdCustomer = await customerService.createNewAccount(
      email, 
      hashedPassword
    )
    t.true(createdCustomer !== null)

    try {
      await customerService.createNewAccount(
        email, 
        hashedPassword
      )        
    } catch (ex) {      
      const errorMessage = _.get(ex, 'message')
      t.is(ERROR.CUSTOMER.ALREGISTERED, errorMessage)
    }
    
  } catch (ex) {
    t.fail()
  }
})

test('add update record', async t => {
  t.pass()
})