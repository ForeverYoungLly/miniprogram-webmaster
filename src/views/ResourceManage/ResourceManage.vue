<template>
  <page-contain title="展示管理">
    <el-upload
      action="http://8.146.208.139:10010"
      v-model:file-list="fileList"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :http-request="HandleHttprequest"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </page-contain>
</template>

<script setup>
import { getSwipers } from '@/api/api.js'
import { ref, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'

onMounted(() => {
  const list = getSwipers()
  console.log(list)
})

// 上传文件列表
const fileList = ref([])

// 预览大图地址
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}

const HandleHttprequest = (data) => {
  console.log(data.file)
}
</script>
