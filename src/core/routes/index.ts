import requireAll = require('require-all')
import { Application } from 'express'
import * as jsonwebtoken from 'jsonwebtoken'
import debug = require('debug')
const log = debug('streaming:route')

export default function initRoutes(app: Application) {
  app.use((req: any, res: any, next) => {
    const headers = req.headers
    const authorization: string = `${headers.authorization}`
    if (headers && authorization && authorization.split(' ')[0] === 'JWT') {
      log(`has token in header`)
      const token = authorization.split(' ')[1]
      jsonwebtoken.verify(token, process.env.JSON_WEB_TOKEN_SECRET || '', (err, decode) => {
        if (err) {
          req.user = undefined
        }
        req.user = decode
        req.user.token = token
        log('req.user: ', req.user)
        next()
      })
    } else {
      log(`no authorization in header: ${authorization}`)
      req.user = undefined
      next()
    }
  })

  requireAll({
    dirname: __dirname,
    filter: (fileName: string) => fileName.indexOf('index') === -1,
    resolve: module => module.default(app),
  })
}
