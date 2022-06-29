import * as mongoose from 'mongoose'
import debug = require('debug')
const log = debug('streaming:db_connection')
let connection

export default function getMongoConnection() {
  try {
    if (connection) {
      return connection
    }
    let connectionString = `mongodb://${process.env.DB_IP}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`
    if (process.env.DB_USERNAME && process.env.DB_PASSWORD) {
      connectionString = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_IP}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`    
    }
    log('connectionString:', connectionString)
    connection = mongoose.createConnection(connectionString, { useNewUrlParser: true })    
    return connection
  } catch (ex) {
    return null
  }  
}