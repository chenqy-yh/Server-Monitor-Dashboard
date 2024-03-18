interface ServerData {
  cpu: CpuData
  load: LoadData
  mem: MemoryData
  disk: DriveData[]
  network: NetworkData
  sname: string
  bit: string
  procs: string
  disk_name: string
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
  // avload_1: string
  // avload_5: string
  // avload_15: string
  // active_total_per: string
  one: string
  five: string
  fifteen: string
  process: string
  last_pid: string
}

interface MemoryData {
  total: number
  free: number
  used: number
  available: number
  shared: number
  buff_cache: number
  size: string
  type: string
}

interface DriveData {
  filesystem: string
  size: string
  used: string
  available: string
  capacity: string
  mountedOn: string
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
