import { Document, Schema, Model, Connection, Types } from 'mongoose'
import * as uuid from 'uuid'

export interface IPeerNoteModel extends Document {
  peerId: string
  createdDate: Date  
  note: string
  supporterId: string
}

export const PeerNoteSchema = new Schema(
  {
    peerId: {
      type: String,
      required: true,
    },        
    createdDate: {
      type: Date,
      required: false,
      default: Date.now,
    },            
    note: {
      type: String,
      required: false,
    },
    supporterId: {
      type: String,
      required: false,
    },    
  },
  { timestamps: true },
)

export default (connection: Connection) =>
  connection.model<IPeerNoteModel>('PeerNote', PeerNoteSchema, 'PeerNote')
