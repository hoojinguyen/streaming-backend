import test from 'ava'
import * as uuid from 'uuid'
import * as md5 from 'md5'
import * as _ from 'lodash'
import debug from 'debug'
import { customerService } from '../../../src/core/services'
import { hashPassword } from '../../../src/core/utils/encrypter'
import { ERROR } from '../../../src/constants/index'
const log = debug('streaming:backend:test:services:redis')

test('save', async t => {
  t.pass()
})
