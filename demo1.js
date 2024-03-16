const t = [
  {
    i: 0,
    v: true
  },
  {
    i: 1,
    v: false
  },
  {
    i: 2,
    v: true
  },
  {
    i: 3,
    v: false
  }
]

t.some((e) => e.v === true) // true
