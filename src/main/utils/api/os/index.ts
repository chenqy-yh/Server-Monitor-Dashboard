import { httpService } from '../../http/index'

/**
 * 获取服务器实时数据
 *
 */
const getServerInfo = async (url) => {
  return await httpService.get<string>(url + '/os/info')
}

export { getServerInfo }
