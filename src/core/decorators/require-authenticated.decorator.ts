import debug = require('debug')
import * as _ from 'lodash'
import { ERROR } from '../../constants'
import { redisCacheService } from '@core/services'
const log = debug('streamming:core:decorator:method')

function convertArgumentsToArgs(argumentsObj: any): any[] {
  const args: any[] = []
  for (let _i = 0; _i < argumentsObj.length; _i++) {
    args[_i - 0] = argumentsObj[_i]
  }
  return args
}

export default function requireAuthenticated(): MethodDecorator {  
  log('requireAuthenticated')
  return (target: any, key: any, descriptor: any) => {    
    if (descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, key)
    }    
    const originalMethod = descriptor.value
    descriptor.value = function() {
      const args = convertArgumentsToArgs(arguments)
      if (!args[0]) return
      const req = args[0]
      const res = args[1]       
      try {
        if (!req.user) {
          res && res.status(403).json({
            error: ERROR.SERVICE.UNAUTHORIZED,
          })
          return
        }
        
        if (_.isFunction(originalMethod)) return originalMethod.apply(this, args)        
        // const session = await redisCacheService.getUserSession(req.user.userId)
        // if (!session || !session.token || session.token !== req.user.token) {
        //   log(`###### Unauthorized user!`)          
        //   res &&
        //     res.status(403).json({
        //       error: ERROR.SERVICE.UNAUTHORIZED,
        //   })
        // }
        // await redisCacheService.refreshUserSession(req.user.userId)
        // log(`###### session: *${JSON.stringify(session)}*`)
        // log(`###### req.user.token *${req.user.token}*`)
        // log(`###### status: *${JSON.stringify(status)}*`)
      } catch (ex) {
        log(`###### Unauthorized user!`)
        res &&
          res.status(403).json({
            error: ERROR.SERVICE.UNAUTHORIZED,
          })
      }           
    }
    return descriptor
  }
}
