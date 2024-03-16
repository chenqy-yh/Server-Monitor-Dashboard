import { setupHandleApi } from './handle'
import { setupOnApi } from './on'


const setupApi = () => {
  const api = {}
  setupHandleApi(api)
  setupOnApi(api)
  return api
}

export { setupApi }
