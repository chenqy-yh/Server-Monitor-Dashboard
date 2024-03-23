const path = '/root/123'

const getNameFromPath = (path) => {
  if (path === '/') {
    return '/'
  } else {
    return path.slice(path.lastIndexOf('/') + 1)
  }
}

const name = getNameFromPath(path)

console.log(name) // root
