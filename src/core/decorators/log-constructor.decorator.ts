import debug = require('debug')
const log = debug('streamming:core:decorator:class')

export function logConstructor<T extends { new (...args: any[]): {} }>(
  originalConstructor: T,
) {
  return class extends originalConstructor {
    constructor(...args: any[]) {
      log(`new class: ${originalConstructor.name}`)
      super(args)
    }
  }
}
