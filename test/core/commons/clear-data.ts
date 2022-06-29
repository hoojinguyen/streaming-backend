import { customerRepo, streamRepo } from '../../../src/core/repositories/index'
export default async function clearData() {
  await customerRepo.removeAll()
  await streamRepo.removeAll()
}