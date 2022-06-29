import CustomerRepo from './customer-repo'
import CustomerSessionRepo from './customer-session-repo'
import StreamRepo from './stream-repo'
import getMongoConnection from '../connections/database-connection'
import PeerRepo from './peer-repo'
import PeerSessionRepo from './peer-session-repo'
import SupporterRepo from './supporter-repo'
const connection = getMongoConnection()

export const customerRepo = new CustomerRepo(connection)
export const customerSessionRepo = new CustomerSessionRepo(connection)
export const streamRepo = new StreamRepo(connection)
export const peerRepo = new PeerRepo(connection)
export const peerSessionRepo = new PeerSessionRepo(connection)
export const supporterRepo = new SupporterRepo(connection)
