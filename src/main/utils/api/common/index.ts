import { httpService } from '../../http'

const pingServer = async (url) => {
  const data = await httpService.get<string>(url + '/ping')
  return data
}

export { pingServer }
