import { Server } from '../../../src/core/server'
import * as uuid from 'uuid'
import * as md5 from 'md5'
import * as _ from 'lodash'
const request = require('supertest')
import debug = require('debug')
const log = debug('streaming:backend:test:common:assign-supporter')
const hashedPassword = md5('12345678')

export default async function assignSupporter(server: Server, admin: any, supporter: any) {
  const response = await request(server.getExpressApp())
    .post('/setting/add_supporter')
    .set('Authorization', `JWT ${_.get(admin, 'token')}`)
    .set('Content-Type', 'application/json')
    .send({
      email: _.get(supporter, 'email'),
    })
  
  return response.body
}