// import { Ref, ref } from 'vue'
// import { useConfigStore } from '@renderer/store'
// import { Pinia, storeToRefs } from 'pinia'

// class ServerInfo {
//   private interval = 5 // s
//   // private status_item_list_common_size = 4

//   connect_status = ref(false)

//   server_info = ref<ServerData>()
//   private server_url: Ref<string>

//   constructor() {
//     const { server_url } = storeToRefs(useConfigStore())
//     this.server_url = server_url
//     // this.connect_status.value = !(await this.pingServer())
//     this.run()
//   }

//   async run() {
//     this.connect_status.value = !(await this.pingServer())
//     if (this.connect_status.value) {
//       return false
//     }
//     setInterval(
//       (() => {
//         this.getServerInfo()
//         return this.getServerInfo
//       })(),
//       this.interval * 1000
//     )
//     return true
//   }

//   private async pingServer() {
//     try {
//       const res = (await window.api.ping(this.server_url.value)) === 'ok'
//       return res
//     } catch (error) {
//       return false
//     }
//   }

//   private async getServerInfo() {
//     this.server_info.value = await window.api.getServerInfo(this.server_url.value)
//   }
// }

// let serverIns: ServerInfo

// const getServerIns = () => {
//   if (!serverIns) {
//     serverIns = new ServerInfo()
//   }
//   return serverIns
// }
// export { getServerIns, ServerInfo }
