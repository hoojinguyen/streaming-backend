process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
import debug from 'debug'
import { Server } from '@core/server'
const log = debug('streaming::app')

log(`App is starting...`)
const server = new Server(`${process.env.SERVER_PORT}`)
server.start()
process.on('unhandledRejection', (reason, promise) => {
  server && server.close()
})
