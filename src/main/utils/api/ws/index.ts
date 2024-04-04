import { httpService } from '../../http'

/**
 *  创建websocket服务
 *
 */
const createWsService = async (url) => {
  const data = await httpService.get<string>(url + '/ws/cws')
  return data
}

/**
 * 关闭websocket服务
 *
 * */
const closeWsService = async (url, port) => {
  const data = await httpService.get<string>(url + '/ws/close', {
    params: {
      port: port
    }
  })
  return data
}

export { createWsService, closeWsService }
