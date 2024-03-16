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

// 获取下标为 1到2的元素
// const result = t.slice(1, 3)
// console.log(result)
// console.log(t)

t.forEach((x) => {
  x.v = false
})

console.log(t)
