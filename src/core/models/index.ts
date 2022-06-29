import * as mongoose from 'mongoose'
import requireAll = require('require-all')
import * as camelcase from 'camelcase'

export default function createModels(connection: mongoose.Connection) {
  return requireAll({
    dirname: __dirname,
    filter: (fileName: string) => fileName.indexOf('index') === -1,
    resolve: (module) => module.default(connection),
    map: (fileName: string) => camelcase(fileName)
  })
}