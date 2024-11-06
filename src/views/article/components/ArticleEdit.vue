<script setup>
// 控制抽屉的显示隐藏
const visibileDrawer = ref(false)
</script>

<template>
    <!-- 抽屉 -->
    <el-drawer v-model="visibileDrawer" title="大标题" size="50%">
      <span>Hi, there!</span>
    </el-drawer>
</template>