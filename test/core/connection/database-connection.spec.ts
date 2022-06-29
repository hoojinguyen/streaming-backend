import test from 'ava'
import getMongoConnection from '../../../src/core/connections/database-connection'

test('Check mongo db connection', async t => {
  console.log('check mongo')
  const connection = getMongoConnection()  
  t.not(connection, null)  
})
