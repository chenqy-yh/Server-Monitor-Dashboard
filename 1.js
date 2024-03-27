const map = new Map()

const o = { a: 1, b: () => {} }

map.set('fs', o)

const ff = map.get('fs')

console.log(ff === o)
