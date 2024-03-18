const cready = () => {
  const r = [
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256)
  ]
  const ra = [
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256)
  ]
  const dr = [
    (ra[0] - r[0]) / (Math.floor(Math.random() * 200) + 50),
    (ra[1] - r[1]) / (Math.floor(Math.random() * 200) + 50),
    (ra[2] - r[2]) / (Math.floor(Math.random() * 200) + 50)
  ]
  const tr = []
  return { r, ra, dr, tr }
}
const chc = (r: number[], ra: number[], dr: number[], tr: number[]) => {
  for (let i = 0; i < 3; i++) {
    r[i] = r[i] + dr[i]
    tr[i] = Math.round(r[i])
    if (tr[i] == ra[i]) {
      ra[i] = Math.floor(Math.random() * 256)
      dr[i] = (ra[i] - r[i]) / (Math.floor(Math.random() * 200) + 50)
    }
  }
  return 'rgb(' + tr + ')'
}

export { cready, chc }
