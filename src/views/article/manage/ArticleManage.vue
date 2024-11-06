<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from '../components/ChannelSelect.vue'
import { artGetListService } from '@/api/article'
import { formatTime } from '@/utils/format'
import ArticleEdit from '../components/ArticleEdit.vue'

const articleList = ref([])
const total = ref(0) // 默认总条数是0
const loading = ref(false)

// 编辑
const onEditArticle = row => {
  articleEditRef.value.open({ row })
}

const articleEditRef = ref()
// 添加
const onAddArticle = () => {
  articleEditRef.value.open({})
}

// 删除
const onDeleteArticle = row => {
  console.log(row)
}

// 搜索
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
// 重置逻辑 => 1.重置表单数据 2.重置分页参数 3.重新请求数据
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}

// 定义请求参数对象
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: '',
})

// 一进页面发请求
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArticleList()

// 处理分页逻辑
const onSizeChange = size => {
  params.value.pagesize = size
  params.value.pagenum = 1
  getArticleList()
}

const onCurrentChange = page => {
  params.value.pagenum = page
  getArticleList()
}

const onSuccess = type => {
  if (type === 'add') {
    // 如果是添加，需要跳转渲染最后一页，编辑直接渲染当前页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">发布文章</el-button>
    </template>

    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类" style="width: 25%">
        <!-- Vue2 => v-model :value 和@input的简写 -->
        <!-- Vue3 => v-modal :modelValue 和@update:modelValue的简写 -->
        <ChannelSelect v-model:model-value="params.cate_id"></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态" style="width: 25%">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章分类" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
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

    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[1, 3, 5, 10]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />

    <!-- 抽屉区域 -->
    <ArticleEdit ref="articleEditRef" @success="onSuccess"></ArticleEdit>
  </page-container>
</template>
