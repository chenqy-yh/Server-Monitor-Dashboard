const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const objToArr = (obj: Record<string, any>) => {
  return Object.keys(obj).map((key) => obj[key])
}

export { delay, objToArr }
