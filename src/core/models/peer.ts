import { Document, Schema, Model, Connection, Types } from 'mongoose'
import * as uuid from 'uuid'

export interface IPeerModel extends Document {
  customerId: string
  isOnline?: boolean
  name?: string
  gender?: string
  email?: string
  phone?: string
}

export const PeerSchema = new Schema(
  {    
    customerId: {
      type: String,
      required: true,
    },    
    isOnline: {
      type: Boolean,
      required: false,
      default: false
    },         
    name: {
      type: String,
      required: false,
    },     
    gender: {
      type: String,
      required: false,
    },     
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },             
  },
  { timestamps: true },
)

export default (connection: Connection) =>
  connection.model<IPeerModel>('Peer', PeerSchema, 'Peer')
