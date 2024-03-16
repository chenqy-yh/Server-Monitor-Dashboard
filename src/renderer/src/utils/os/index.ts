// 字节转MB GB

export const sizeFormat = (size: number) => {
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
export const byteToMB = (byte: number) => {
  return (byte / 1024 / 1024).toFixed(2)
}

export const byteToGB = (byte: number) => {
  return (byte / 1024 / 1024 / 1024).toFixed(2)
}
