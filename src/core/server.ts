import * as debug from 'debug'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as helmet from 'helmet'
import * as http from 'http'
import * as socketio from 'socket.io'
import * as socketParser from 'socket.io-cookie'
import * as socketioRedis from 'socket.io-redis'
import * as _ from 'lodash'
import * as socketioJwt from 'socketio-jwt'
import { redisCacheService } from '@core/services'
import initRoutes from '@core/routes'
import * as initEmitter from 'socket.io-emitter'
import websocketHandler from './handlers/websocket'
import { peerService, socketBroadcaster, customerService } from './services/index'
import { GROUPS, TYPES } from '../constants/index'
import { IPeerModel } from './models/peer'
import { peerRepo } from './repositories/index'
const log = debug('streaming:backend:server')
const multipartyOptions = {
  autoFiles: true,
}
const opts = {
  host: process.env.REDIS_HOST || `redis`,
  port: Number.parseInt(process.env.REDIS_PORT || `6379`, 10) || 6379,
}
const emitter = initEmitter(null, opts)

export class Server {
  public server: http.Server
  public app: express.Application
  public peerIO: socketio.Server

  public adminIO: socketio.Server
  public sessions: any[]

  constructor(port?: string) {
    this.sessions = []
    this.app = express()
    this.app.set('port', Number.parseInt(port || `8000`, 10) || 8000)
    this.server = http.createServer(this.app)    
    this.server.on('error', onError)
    this.server.on('listening', () => {
      log(`Server is listening on port ${(this.app && this.app.get('port')) || 7000}`)      
    })
    this.configExpress()
    this.configAdminSocketIO()
    this.configPeerSocketIO()
  }  

  public getExpressApp(): express.Application {
    return this.app
  }
  public start() {
    this.server.listen(this.app.get('port') || 7000)
  }

  public async configExpress() {
    log('configExpress')
    this.app.use(helmet())
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      )
      next()
    })

    // mount json form parser
    this.app.use(bodyParser.json())

    // mount query string parser
    this.app.use(bodyParser.urlencoded({ extended: true }))

    initRoutes(this.app)
    this.app.use(
      (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        log(`Handler error: ${err}`)
        res.status(404).send({ url: req.originalUrl + ' not found' })
      },
    )
  }

  public close() {
    // Handle shutdown server
  }

  protected async configAdminSocketIO() {
    log('configAdminSocketIO')
    this.adminIO = socketio({
      path: '/admin',
      serveClient: false,      
    })

    this.adminIO.attach(this.server, {
      pingInterval: 3000,
      pingTimeout: 12000,
    })          

    this.adminIO.use(socketParser)
    this.adminIO.use(
      socketioJwt.authorize({
        secret: process.env.JSON_WEB_TOKEN_SECRET,
        handshake: true,
      }),
    )
    
    this.adminIO.adapter(
      socketioRedis({
        host: process.env.REDIS_HOST || `redis`,
        port: process.env.REDIS_PORT,
      } as socketioRedis.SocketIORedisOptions),
    )

    this.adminIO.on('connection', this.onSocketConnect.bind(this))
    this.adminIO.on('reconnect', this.onSocketReconnect.bind(this))
    this.adminIO.on('disconnect', this.onSocketDisconnect.bind(this))
  }

  protected async configPeerSocketIO() {
    log('configPeerSocketIO')
    this.peerIO = socketio({
      path: '/peer',
      serveClient: false,      
    })

    this.peerIO.attach(this.server, {
      pingInterval: 3000,
      pingTimeout: 12000,
    })
    
    this.peerIO.use(socketParser)    
    this.peerIO.use(
      socketioJwt.authorize({
        secret: process.env.JSON_WEB_TOKEN_SECRET,
        handshake: true,
      }),
    )
    this.peerIO.adapter(
      socketioRedis({
        host: process.env.REDIS_HOST || `redis`,
        port: process.env.REDIS_PORT,
      } as socketioRedis.SocketIORedisOptions),
    )

    this.peerIO.on('connection', this.onSocketConnect.bind(this))
    this.peerIO.on('reconnect', this.onSocketReconnect.bind(this))
    this.peerIO.on('disconnect', this.onSocketDisconnect.bind(this))
  }

  protected async onSocketConnect(socket: socketio.Socket) {
    log(`###### Connection from socket: ${socket.id}`)    
    const tokenData = socket[`decoded_token`]
    const { widgetId, accountId } = tokenData    
    const isAdmin = !_.isEmpty(accountId)
    const isPeer = !_.isEmpty(widgetId)
    const peerId = socket.handshake.query[`peerId`]
    log('peerId: ', peerId)

    if (isAdmin) {
      log('customerService.updateOnlineStatus')
      // Update admin status      
      customerService.updateOnlineStatus(accountId, true)
      customerService.createNewSession(accountId, socket.id)
    }

    if (isPeer) {
      log('update peer socket info')
      peerService.createPeerSession(widgetId, peerId, socket.id)
      peerService.updatePeer(peerId, true)      
    }

    socket.on('message', async (msg) => {
      log('socket on message:', msg)
      websocketHandler.processMessage(socket, msg, {
        isAdmin,
        accountId,
        widgetId,
        isPeer,
        peerId
      })
    })
  }

  protected async onSocketReconnect(socket: socketio.Socket) {
    log(`Re-connection from socket: ${socket.id}`)
  }

  protected async onSocketDisconnect(socket: socketio.Socket) {
    log(`Disconnection from socket: ${socket.id}`)
  } 

}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any) {
  log(`###### server error: *${error.stack || JSON.stringify(error)}*`)
  if (error.syscall !== `listen`) {
    throw error
  }
}
