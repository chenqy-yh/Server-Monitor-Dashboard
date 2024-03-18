// 字节转MB GB

const size_map = {
  GB: 1024 * 1024 * 1024,
  G: 1024 * 1024 * 1024,
  MB: 1024 * 1024,
  M: 1024 * 1024,
  KB: 1024,
  K: 1024,
  B: 1
}

const sizeFormat = (size: number) => {
  if (size < 1024) {
    return size.toFixed(2) + 'B'
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + 'KB'
  } else if (size < 1024 * 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + 'MB'
  } else {
    return (size / 1024 / 1024 / 1024).toFixed(2) + 'GB'
  }
}
const byteToMB = (byte: number) => {
  return (byte / 1024 / 1024).toFixed(2)
}

const byteToGB = (byte: number) => {
  return (byte / 1024 / 1024 / 1024).toFixed(2)
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
