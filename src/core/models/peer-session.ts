import { Document, Schema, Model, Connection, Types } from 'mongoose'
import * as uuid from 'uuid'

export interface IPeerSessionModel extends Document {
  customerId: string
  peerId: string
  socketId: string
  createdDate: Date
  endDate: Date
  ip?: string
  isActive: boolean
}

export const PeerSessionSchema = new Schema(
  {
    customerId: {
      type: String,
      required: true,
    },    
    peerId: {
      type: String,
      required: true,
    },    
    socketId: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true
    },       
    createdDate: {
      type: Date,
      required: false,
      default: Date.now,
    },        
    endDate: {
      type: Date,
      required: false,
    },
    ip: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
)

export default (connection: Connection) =>
  connection.model<IPeerSessionModel>('PeerSession', PeerSessionSchema, 'PeerSession')
