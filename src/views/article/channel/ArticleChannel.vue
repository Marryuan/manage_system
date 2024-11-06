<script setup>
import { artGetChannelsService } from '@/api/article'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import channelEdit from '../components/channelEdit.vue'
import { artDelChannelService } from '@/api/article'
import { ElMessage } from 'element-plus'

const channelList = ref([])
const dialog = ref()

const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  console.log(res)
  channelList.value = res.data.data
  loading.value = false
}

// 删除和编辑的相关操作
const onAddChannel = () => {
  dialog.value.open({})
}

const onEditChannel = row => {
  dialog.value.open({ row })
}
const onDelChannel = async row => {
  await ElMessageBox.confirm('你确认要取消么','温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelChannelService(row.id)
  ElMessage.success('删除成功')
  getChannelList()
}

onMounted(() => {
  getChannelList()
})

// el-table表格的loading效果
const loading = ref(false)

// 准备弹层
const dialogVisible = ref(false)

// 子传父
const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel"> 添加分类 </el-button>
    </template>
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <channelEdit ref="dialog" @success="onSuccess"></channelEdit>
  </page-container>
</template>
