import { Document, Schema, Model, Connection, Types } from 'mongoose'
import * as uuid from 'uuid'

export interface IStreamModel extends Document {
  customerId: string
  supporterId: string  
  peerId: string
  createdDate: Date
  connectedDate: Date
  endDate: Date
  isRunning: boolean
}

export const StreamSchema = new Schema(
  {
    customerId: {
      type: String,
      required: true,
    },    
    supporterId: {
      type: String,
      required: false,
    },    
    peerId: {
      type: String,
      required: false,
    },    
    createdDate: {
      type: Date,
      required: false,
      default: Date.now,
    },
    connectedDate: {
      type: Date,
      required: false,
    },
    endDate: {
      type: Date,
      required: false,
    }, 
    isRunning: {
      type: Boolean,
      required: false,
      default: false,
    }, 
  },
  { timestamps: true },
)

export default (connection: Connection) =>
  connection.model<IStreamModel>('Stream', StreamSchema, 'Stream')
