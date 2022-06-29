console.log(process.env.USE_MOCK_SERVICE);
const IS_PERFORMING_TEST = process.env.USE_MOCK_SERVICE === 'true';

// Customer
import ICustomerService from './customer.service.d';
import IPeerService from './peer.service.d';
import ISocketBroadcaster from './socket-broadcaster.service.d';
import ISupporterService from './supporter.service.d';
import IStreamService from './stream.service.d';
import MockCustomerService from './customer.service.mock';

// RedisCacheService
import IRedisCacheService from './redis-cache.service.d';
import RedisCacheService from './redis-cache.service';
import PeerService from './peer.service';
import CustomerService from './customer.service';
import SupporterService from './supporter.service';
import SocketBroadcaster from './socket-broadcaster.service';
import StreamService from './stream.service';

export const customerService: ICustomerService = IS_PERFORMING_TEST
  ? new MockCustomerService()
  : new CustomerService();
export const redisCacheService: IRedisCacheService = new RedisCacheService();
export const peerService: IPeerService = new PeerService();
export const supporterService: ISupporterService = new SupporterService();
export const socketBroadcaster: ISocketBroadcaster = new SocketBroadcaster();
export const streamService: IStreamService = new StreamService();
