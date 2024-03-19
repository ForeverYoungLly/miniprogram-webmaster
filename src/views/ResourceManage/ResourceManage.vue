<template>
  <page-contain title="展示管理">
    <el-upload
      action="http://8.146.208.139:3000/upload"
      method="post"
      v-model:file-list="fileList"
      list-type="picture-card"
      :before-upload="a1"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleUpImage"
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

const HandleHttprequest = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handleUpImage = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
const a1 = (res) => {
  console.log(res)
}
</script>
