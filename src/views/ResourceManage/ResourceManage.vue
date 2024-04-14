<template>
  <page-contain title="展示管理">
    <el-upload
      action="https://meet.ysyxmy.top/upload"
      method="post"
      v-model:file-list="fileList"
      list-type="picture-card"
      :before-upload="beforePicUpload"
      multiple="true"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleUpImage"
      :http-request="HandleHttprequest"
      auto-upload="false"
      accept=".jpg,.png"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <!-- <img w-full :src="dialogImageUrl" alt="Preview Image" /> -->
      <el-image :src="dialogImageUrl" :fit="fit" />
    </el-dialog>
    <div class="btns">
      <el-button type="primary" size="large" @click="unpoadImgAll"
        >上传</el-button
      >
      <el-button type="Info" size="large" @click="delAll">清空</el-button>
    </div>
  </page-contain>
</template>
<style>
.btns {
  width: 40%;
  display: flex;
  justify-content: space-between;
  margin: 4vw auto;
}
</style>
<script setup>
import { getSwipers, addSwiper, deleteSwiper } from '@/api/api.js'
import { ref, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

onMounted(() => {
  GetSwiper()
})
const GetSwiper = () => {
  fileList.value = []
  getSwipers()
    .then((res) => {
      console.log(res)
      if (res.code != 200) {
        ElMessage.error('获取失败')
      } else {
        fileList.value = []
        res.data.forEach((item) => {
          fileList.value.push({
            uuid: item.id,
            url: item.url,
            status: 'ready'
          })
          console.log(item.url)
        })
      }
    })
    .catch((err) => {
      console.log(err)
      ElMessage.error('获取失败')
    })
}
// 上传文件列表
const fileList = ref([])

// 预览大图地址
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

//设置上传
const uploadImg = async (raw) => {
  try {
    let formData = new FormData()
    formData.append('img', raw)

    // 发起上传请求
    const uploadResponse = await axios.post(
      'https://meet.ysyxmy.top/upload',
      formData
    )
    const imgUrl = uploadResponse.data.data
    // 调用 addSwiper 函数
    let data = {
      name: 'swiper',
      url: imgUrl
    }
    const addSwiperResponse = await addSwiper(data)

    // 输出结果
    console.log(addSwiperResponse)
  } catch (error) {
    console.log(error)
    ElMessage.error('上传错误')
  }
}

const unpoadImgAll = () => {
  const loadingInstance = ElLoading.service({
    fullscreen: true,
    text: '上传中',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  fileList.value.forEach((item) => {
    if (item.raw) uploadImg(item.raw)
  })
  setTimeout(() => {
    loadingInstance.close()
    GetSwiper()
  }, 2000)
}
const handleRemove = (uploadFile) => {
  console.log(uploadFile)
  if (uploadFile.uuid) {
    let data = {
      id: uploadFile.uuid
    }
    deleteSwiper(data)
      .then((res) => {
        console.log(res)
        if (res.code != 200) {
          ElMessage.error('删除失败')
          return
        }
      })
      .catch((err) => {
        console.log(err)
        ElMessage.error('删除失败')
      })
  }
}

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  console.log(fileList.value[0].raw)
  dialogVisible.value = true
}
const delAll = () => {
  const loadingInstance = ElLoading.service({
    fullscreen: true,
    text: '删除中',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  console.log(fileList.value)
  fileList.value.forEach((item) => {
    let data = {
      id: item.uuid
    }
    deleteSwiper(data)
      .then((res) => {
        console.log(res)
        if (res.code != 200) {
          loadingInstance.close()
          ElMessage.error('删除失败')
          return
        }
      })
      .catch((err) => {
        loadingInstance.close()
        console.log(err)
        ElMessage.error('删除失败')
      })
  })
  fileList.value = []
  loadingInstance.close()
  ElMessage({
    message: '清空成功',
    type: 'success'
  })
}
const HandleHttprequest = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handleUpImage = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const beforePicUpload = (uploadfile) => {
  const isImg =
    uploadfile.type === 'image/jpeg' || uploadfile.type === 'image/png'
  if (!isImg) {
    ElMessage.error('上传图片只能是 JPG 或 PNG 格式!')
  }
  return isImg
}
</script>
