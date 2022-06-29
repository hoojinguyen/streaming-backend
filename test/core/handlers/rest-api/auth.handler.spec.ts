import test from 'ava'
import { Server } from '../../../../src/core/server'
import * as uuid from 'uuid'
import { hashPassword } from '../../../../src/core/utils/encrypter'
import * as md5 from 'md5'
import * as _ from 'lodash'
import { customerRepo } from '../../../../src/core/repositories/index'
import clearData from '../../commons/clear-data'
import createUser from '../../commons/create-user'
import debug = require('debug')
import { createSecureServer } from 'http2'
const log = debug('streaming:backend:test:handlers:rest-api:auth')
const request = require('supertest')
const server = new Server()
const hashedPassword = md5('12345678')
const random = uuid()
const email = `${random}@gmail.com`
test.before('clear data', async t => {
  await clearData()
})

test('sign-up', async t => {
  const userInfo = await createUser(server, email)
  log('userInfo: ', userInfo)
  t.true(_.isEmpty(_.get(userInfo, 'hashedPassword')))
  t.true(!_.isEmpty(_.get(userInfo, 'token')))
  t.true(!_.isEmpty(_.get(userInfo, 'email')))
  t.is(_.get(userInfo, 'email'), email)
  
})

test('sign-in', async t => {
  const response = await request(server.getExpressApp())
    .post('/auth/sign_in')
    .send({
      email,
      hashedPassword
    })
  log('response: ', response.body)
  t.is(response.status, 200)  
  t.true(_.isEmpty(_.get(response.body, 'hashedPassword')))
  t.true(_.isEmpty(_.get(response.body, 'hashedPassword')))
  t.true(!_.isEmpty(_.get(response.body, 'token')))
  t.true(!_.isEmpty(_.get(response.body, 'email')))      

  await request(server.getExpressApp())
    .post('/auth/sign_out')    
    .set('Authorization', `JWT ${_.get(response.body, 'token')}`)
    .set('Content-Type', 'application/json')
    .send({})
    
  t.pass()
})
