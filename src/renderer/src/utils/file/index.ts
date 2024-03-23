/**
 *  @description 根据目标文件解析下一个路径
 *
 */
const solveNextPath = (path: string, fileName: string) => {
  return path === '/' ? `/${fileName}` : `${path}/${fileName}`
}

const dirComparer = (a: FileStat, b: FileStat) => {
  if (a.dir && !b.dir) {
    return -1
  } else if (!a.dir && b.dir) {
    return 1
  } else {
    return a.name.localeCompare(b.name)
  }
}
export { solveNextPath, dirComparer }
