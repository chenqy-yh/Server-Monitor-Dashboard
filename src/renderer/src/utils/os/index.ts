// 字节转MB GB

const G = 1 << 30
const M = 1 << 20
const K = 1 << 10

const size_map = {
  GB: G,
  G: G,
  MB: M,
  M: M,
  KB: K,
  K: K,
  B: 1
}

const sizeFormat = (size: number) => {
  if (size < K) {
    return size.toFixed(2) + 'B'
  } else if (size < M) {
    return (size / K).toFixed(2) + 'KB'
  } else if (size < G) {
    return (size / M).toFixed(2) + 'MB'
  } else {
    return (size / G).toFixed(2) + 'GB'
  }
}
const byteToMB = (byte: number) => {
  return (byte / M).toFixed(2)
}

const byteToGB = (byte: number) => {
  return (byte / G).toFixed(2)
}

const sizeStrToByte = (size: string) => {
  const num = parseFloat(size)
  const unit = size.replace(num.toString(), '').trim()
  return num * size_map[unit]
}

const sortDisk = (disk_info_list: DriveData[]) => {
  return disk_info_list.sort((a, b) => {
    return sizeStrToByte(b.size) - sizeStrToByte(a.size)
  })
}

export { sortDisk, sizeFormat, byteToMB, byteToGB, sizeStrToByte }
