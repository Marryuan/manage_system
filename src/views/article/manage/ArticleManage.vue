<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from '../components/ChannelSelect.vue'

const articleList = ref([
  {
    id: 5961,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:53:52.604',
    state: '已发布',
    cate_name: '体育',
  },
  {
    id: 5962,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:54:30.904',
    state: '草稿',
    cate_name: '体育',
  },
])

// 编辑
const onEditArticle = row => {
  console.log(row)
}
// 删除

const cateId = ref()

const onDeleteArticle = row => {
  console.log(row)
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary">发布文章</el-button>
    </template>

    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类" style="width: 25%">
        <!-- Vue2 => v-model :value 和@input的简写 -->
        <!-- Vue3 => v-modal :modelValue 和@update:modelValue的简写 -->
        <ChannelSelect v-model="cateId"></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态" style="width: 25%">
        <el-select>
          <el-option label="以发布" value="1"></el-option>
          <el-option label="草稿" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table :data="articleList">
      <el-table-column label="文章分类" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date"></el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            type="primary"
            circle
            plain
            :icon="Edit"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            type="danger"
            circle
            plain
            :icon="Delete"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </page-container>
</template>
