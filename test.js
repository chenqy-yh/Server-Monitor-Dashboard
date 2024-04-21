const ar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const xr = [1, 3, 5, 7]

const tr = ar.reduce((acc, cur, i) => {
  xr.includes(i) || acc.push(i)
  return acc
}, [])

console.log(tr)
