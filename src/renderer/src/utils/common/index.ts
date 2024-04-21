const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const objToArr = (obj: Record<string, any>) => {
  return Object.keys(obj).map((key) => obj[key])
}

const cloneObjDropFunc = (obj: Record<string, any>) => {
  const newObj = {}
  for (const key in obj) {
    if (typeof obj[key] !== 'function') {
      console.log('key', key)
      newObj[key] = typeof obj[key] === 'object' ? cloneObjDropFunc(obj[key]) : obj[key]
    }
  }
  return newObj
}

const shallowClone = <T>(obj: T) => {
  const newObj = {} as T
  for (const key in obj) {
    newObj[key] = obj[key]
  }
  return newObj as T
}

export { delay, objToArr, cloneObjDropFunc, shallowClone }
