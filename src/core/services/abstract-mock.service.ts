import * as _ from 'lodash'
import IMockService from './mock.service.d'
import debug from 'debug'
const log = debug('kaira.workflow:core:MockService')
export default class AbstractMockService implements IMockService {
  mockDatas: any[]
  clearMockDatas(): void {
    this.mockDatas = []
  }
  
  popMock() {
    if (!_.isEmpty(this.mockDatas)) {
      const mockData = this.mockDatas.shift()
      log('mockData: ', JSON.stringify(mockData))
      return mockData
    } else {
      return null
    }
  }
  
  pushMockData(data: any) {
    this.mockDatas.push(data)    
  }
  
}