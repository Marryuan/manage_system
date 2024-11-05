<script setup>
import { ref } from 'vue'

const dialogVisible = ref(false)


// 组件调用的一个open方法，基于open传来的参数，区分添加还是编辑
const open = async row => {
  dialogVisible.value = true
  console.log(row)
}

// 向外暴露方法
defineExpose({
  open,
})

// 准备弹层表单
</script>

<template>
  <el-dialog v-model="dialogVisible" title="添加弹层" width="30%">
    <div>渲染表单</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
