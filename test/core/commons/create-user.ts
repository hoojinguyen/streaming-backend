import { Server } from '../../../src/core/server'
import * as uuid from 'uuid'
import * as md5 from 'md5'
import * as _ from 'lodash'
const request = require('supertest')
import debug = require('debug')
const log = debug('streaming:backend:test:common:create-user')
const hashedPassword = md5('12345678')

export default async function createUser(server: Server, email?: string) {
  const response = await request(server.getExpressApp())
    .post('/auth/sign_up')
    .send({
      email: email || `${uuid()}@gmail.com`,
      hashedPassword,
      zoneName: 'America/New_York',
    })
  log('new User: ', response.body)  
  return response.body
}