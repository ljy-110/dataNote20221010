el-tree的子节点部分选中父节点半选中实现

```js
//list  后端返回的节点数组 [0:1231231212313,1:1231212331]
//getNode()  看文档 根据 data 或者 key 拿到 Tree 组件中的 node	(data) 要获得 node 的 key 或者 data 
//setCheckedKeys	通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性	| (keys, leafOnly) 接收两个参数，1. 勾选节点的 key 的数组 2. boolean 类型的参数，若为 true 则仅设置叶子节点的选中状态，默认值为 false
this.$nextTick(() => {
                const arr = []
               list.forEach(item => {
                  if (!this.$refs.tree.getNode(item).childNodes || !this.$refs.tree.getNode(item).childNodes.length) {
                    arr.push(item)
                  }
                })
                this.$refs.tree.setCheckedKeys(arr)
              })
```

