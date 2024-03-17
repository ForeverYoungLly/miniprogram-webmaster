<script setup>
const TypeList = [
  '篮球',
  '足球',
  '排球',
  '羽毛球',
  '游泳',
  '健身',
  '拼车',
  '演唱会',
  '拼车',
  '旅行',
  '学习',
  '其他'
]
import { onMounted, ref } from 'vue'
import { showPost } from '../../api/api'
const selectedType = ref('')
const selectedStatus = ref('')

let dataMess = ref({
  pageNum: 1,
  pageSize: 5,
  tagId: '',
  status: ''
})
const getPost = async () => {
  console.log(JSON.parse(localStorage.getItem('token')).accessToken)
  const res = await showPost(dataMess)
  console.log(res)
}
onMounted(() => {
  getPost()
})
</script>

<template>
  <page-contain title="所有帖子">
    <el-form inline>
      <el-form-item label="帖子分类:">
        <el-select v-model="selectedType" placeholder="请选择">
          <el-option
            v-for="type in TypeList"
            :key="type"
            :label="type"
            :value="type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态:">
        <el-select v-model="selectedStatus" placeholder="请选择">
          <el-option label="匹配中" value="0"></el-option>
          <el-option label="已完成" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">重置</el-button>
      </el-form-item>
    </el-form>
  </page-contain>
</template>
