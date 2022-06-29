export default interface IMockService {  
  
  mockDatas: any[]
  
  pushMockData(data: any) 

  popMock(): any

  clearMockDatas(): void
}