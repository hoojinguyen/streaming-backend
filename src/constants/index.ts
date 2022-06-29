export const GROUPS = {
  PEER: 1,
  NOTICATION: 2,
  SUPPORTER: 3,
}

export const TYPES = {  
  PEER: {  
    REQUEST_CALL: 1,
    ACCEPT_CALL: 2,
    STOP_REQUEST_CALL: 3,
    UPDATE_NETWORKD_CANDIDATE: 4,
  },  
  NOTICATION: {
    SYSTEM_BROADCAST: 1,
  },
  SUPPORTER: {
    NOTIFY_NEW_CALL: 1,
  },
}

export const ERROR = {
  COMMON: {
    MISSARGUMENT: JSON.stringify({ code: 101, message: 'missargument' }),
  },
  SERVICE: {
    UNKNOWN: JSON.stringify({ code: 0, message: 'unknown exception' }),
    UNAVAILABLE: JSON.stringify({ code: 1, message: 'service is not available' }),
    UNAUTHORIZED: JSON.stringify({ code: 1, message: 'unauthorized' }),
  },
  CUSTOMER: {
    UNKNOWN: JSON.stringify({ code: 10, message: 'unknown' }),
    UNREGISTERED: JSON.stringify({ code: 11, message: 'unregistered' }),
    ALREGISTERED: JSON.stringify({ code: 12, message: 'account had used' }),
    MISSARGUMENT: JSON.stringify({ code: 13, message: 'missargument' }),
    INVALID_EMAIL: JSON.stringify({ code: 14, message: 'invalid email' }),
    INVALIDATE: JSON.stringify({ code: 15, message: 'invalid' }),
  },    
  STREAM: {
    UNKNOWN: JSON.stringify({ code: 30, message: 'unknown' }),    
    MISSARGUMENT: JSON.stringify({ code: 31, message: 'missargument' }),    
    INVALID_PEER_INFO: JSON.stringify({ code: 32, message: 'invalid peer info, let check streamId, peerId, peerKey' }),    
  },
  PEER: {
    MISSARGUMENT: JSON.stringify({ code: 31, message: 'missargument' }),
  },  
  SUPPORTER: {
    COULD_NOT_ACCEPT_CALL_BECAUSE_TAKEN_BY_OTHER: JSON.stringify({ code: 51, message: 'Another supporter has taked care this call' }),
  }  
}

export { StreamType } from './stream-type'