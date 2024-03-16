import * as COS from 'tencentcloud-sdk-nodejs-lighthouse'

const lhclient = COS.lighthouse.v20200324.Client

const client_config = {
  credential: {
    secretId: import.meta.env.MA_TencentSecretID,
    secretKey: import.meta.env.MA_TencentSecretKey
  },
  region: import.meta.env.MA_TencentRegion,
  profile: {
    httpProfile: {
      endpoint: 'lighthouse.tencentcloudapi.com'
    }
  }
}

const tencent_client = new lhclient(client_config)

const updateClientCredential = (secretId: string, secretKey: string) => {
  client_config.credential.secretId = secretId
  client_config.credential.secretKey = secretKey
}

const updateClientRegion = (region: string) => {
  client_config.region = region
}

const getClientInfo: () => TencentClientInfo = () => {
  return {
    secretId: client_config.credential.secretId,
    secretKey: client_config.credential.secretKey,
    region: client_config.region
  }
}

export { getClientInfo, tencent_client, updateClientCredential, updateClientRegion }
