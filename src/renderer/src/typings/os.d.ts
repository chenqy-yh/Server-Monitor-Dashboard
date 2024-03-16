interface ServerData {
  cpu: CpuData
  load: LoadData
  mem: MemoryData
  disk: DriveData[]
  network: NetworkData
}

interface CpuData {
  manufacturer: string
  brand: string
  speed: number
  processors: number
  physical: number
  performance: number
  usage: number
}

interface LoadData {
  avload_1: string
  avload_5: string
  avload_15: string
  active_total_per: string
}

interface MemoryData {
  total: number
  free: number
  used: number
  available: number
}

interface DriveData {
  _filesystem: string
  _blocks: number
  _used: number
  _available: number
  _capacity: string
  _mounted: string
}
interface NetworkData {
  list: NetworkItemData[]
  downT: number
  upT: number
}

interface NetworkItemData {
  downT: number
  upT: number
  name: string
}
