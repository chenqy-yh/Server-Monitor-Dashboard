import { httpService } from '../../http'

/**
 * 获取服务器日志
 *
 */
const getServerLog = async (url, type, page, size = 10) => {
  return await httpService.get<{ total: number; data: string[] }>(url + '/log/get', {
    params: {
      type: type,
      p: page,
      s: size
    }
  })
}

export { getServerLog }
