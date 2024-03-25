/*
 * @Date: 2024-03-23 22:09:22
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-26 00:17:53
 * @FilePath: \server-monitor\1.js
 * @Description: True or False
 */

const path = '/root/test1/1'

const tree = {
  name: 'root',
  children: [
    {
      name: 'test2',
      children: [
        {
          name: '2',
          children: []
        }
      ]
    },
    {
      name: 'test1',
      children: [
        {
          name: '1',
          children: []
        }
      ]
    }
  ]
}

const new_node = {
  name: '1',
  children: [
    {
      name: '3',
      children: []
    }
  ]
}

function addNode(path, tree, new_node) {
  const pathArr = path.split('/').filter((item) => item)
  let cur = tree
  for (let i = 0; i < pathArr.length; i++) {
    const name = pathArr[i]
    const index = cur.children.findIndex((item) => item.name === name)
    if (index === -1) {
      return false
    }
    cur = cur.children[index]
  }
  cur.children.push(new_node)
  return true
}

addNode(path, tree, new_node)
