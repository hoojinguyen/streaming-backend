import * as _ from 'lodash'
export async function runAfter(timeBeforeCall: number, cb: any, timeout?: number, timeoutCb?: any): Promise<void> {
  await delaySynchronously(timeBeforeCall)
  let timeoutExecution: NodeJS.Timeout|null = null
  if (timeout && timeoutCb) {
    timeoutExecution = setTimeout(() => {
      _.isFunction(timeoutCb) && timeoutCb()    
    }, timeout)
  }
  _.isFunction(cb) && cb(() => {    
    timeoutExecution && clearTimeout(timeoutExecution)
  })  
}

export async function delaySynchronously(time: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
