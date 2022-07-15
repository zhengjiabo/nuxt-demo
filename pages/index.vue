<template>
  <el-tree
    class="tree"
    :data="data"
    accordion
    :render-content="renderContent"
    @node-click="handleNodeClick">
  </el-tree>

</template>

<script>
import {getTreeData} from '@/script/getTreeData.js'

export default {
  asyncData({ params, error }) {
    return getTreeData('E:/web/learning/simple-deploy/jike/doc')
      .then(res => {
        console.log(res)
        return { data: res}
      })
      .catch(e => {
        console.log(e)
        error({ statusCode: 404, message: 'Post not found' })
      })
  },
  methods: {
    renderContent(h, { node, data, store }){
      const t = 'break-spaces'
      return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span style="{ { white-space: t } }">
              <span>{node.label}</span>
            </span>
          </span>);   
    },
    handleNodeClick(data) {
      console.log(data);
    }
  }
}
</script>
<style>
.tree .el-tree-node__content{
  height: auto;
}
</style>
