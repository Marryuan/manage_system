<script setup>
import { ref } from 'vue'
import { artAddChannelService } from '@/api/article'
import { artEditChannelService } from '@/api/article'


const dialogVisible = ref(false)
const formRef = ref()
const formModel = ref({
  cate_name: '',
  cate_alias: '',
})

// 确定校验规则
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名在 1 到 10 位的非空字符',
      trigger: 'blur',
    },
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是在 1 到 15 位的字母或数字',
      trigger: 'blur',
    },
  ],
}

// 组件调用的一个open方法，基于open传来的参数，区分添加还是编辑
const open = row => {
  dialogVisible.value = true
  formModel.value = { ...row.row } // 添加存储了表单内容，编辑->存储了需要回显的数据
  console.log('formModel.value', formModel.row.id)
}

const emit = defineEmits(['success'])
const OnSubmit = async () => {
  await formRef.value.validate()
  const isEdit = formModel.value.id // 判断是添加还是编辑
  if (isEdit) {
    await artEditChannelService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await artAddChannelService(formModel.value)
    ElMessage.success('添加成功')
  }

  dialogVisible.value = false
  // 然后更新
  emit('success')
}
// 向外暴露方法
defineExpose({
  open,
})

// 准备弹层表单
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="30%"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input
          placeholder="请输入分类名称"
          v-model="formModel.cate_name"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input
          placeholder="请输入分类别名"
          v-model="formModel.cate_alias"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="OnSubmit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
