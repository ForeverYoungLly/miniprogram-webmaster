<script setup>
import { onMounted } from 'vue'
import { ref } from 'vue'
import { Delete, Plus } from '@element-plus/icons-vue'
import { addTag, deleteTag } from '../../api/api'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const dynamicTags = ref([])
const fileList = ref([])
const dialogVisible = ref(false)
const beforePicUpload = (uploadfile) => {
  const isImg =
    uploadfile.type === 'image/jpeg' || uploadfile.type === 'image/png'
  if (!isImg) {
    ElMessage.error('上传图片只能是 JPG 或 PNG 格式!')
  }
  return isImg
}
const getTaglist = async () => {
  dynamicTags.value=[]
  axios
    .get('http://8.146.208.139:10010/tag/list')
    .then((response) => {
      response.data.data.forEach(function (element) {
        dynamicTags.value.push({
          name: element.name,
          src: element.url,
          id: element.id
        })
      })
    })
    .catch((error) => {
      throw error
    })
}
const HandleHttprequest = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
const Deltag = (id) => {
  let data = {
    id: id
  }
  deleteTag(data)
    .then((res) => {
      console.log(res)
      if (res.code == 200) {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
        getTaglist()
      } else {
        ElMessage.error('添加错误')
      }
    })
    .catch((err) => {
      console.log(err)
      ElMessage.error('添加错误')
    })
}
const handleUpImage = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
const input = ref('')

const Cancel = () => {
  input.value = ''
  fileList.value=[]
  dialogVisible.value = false
}
const upload = () => {
  try {
    let raw = fileList.value[0].raw
    let formData = new FormData()
    formData.append('img', raw)

    // 发起上传请求
    axios({
      method: 'POST',
      url: 'http://8.146.208.139:3000/upload',
      data: formData
    }).then((res) => {
      console.log(res.data.data)
      let data = {
        name: input.value,
        url: res.data.data
      }
      addTag(data)
        .then((res) => {
          if (res.code == 200) {
            input.value = ''
            dialogVisible.value = false
            console.log(res)
            ElMessage({
              message: '添加成功',
              type: 'success'
            })
            fileList.value=[]
            getTaglist()
          } else {
            ElMessage.error('添加错误')
          }
        })
        .catch((err) => {
          console.log(err)
          ElMessage.error('添加错误')
        })
    })
    // return url
  } catch (error) {
    console.log(error)
    ElMessage.error('添加错误')
  }
}
onMounted(() => {
  getTaglist()
})
</script>
<template>
  <page-contain title="标签管理">
    <div style="width: 100%; display: flex; justify-content: flex-end">
      <el-button type="primary" round @click="dialogVisible = true"
        >添加</el-button
      >
    </div>
    <div
      style="
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        /* justify-content: space-evenly; */
      "
    >
      <div class="flex gap-2" v-for="(item, index) in dynamicTags" :key="index">
        <el-card
          style="
            /* margin-bottom: 20px; */
            max-width: 200px;
            align-items: center;
            margin: 20px 1vw;
            border: 2px solid #409eff; /* 添加边框 */
            box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1); /* 添加阴影 */
          "
        >
          <template #header>
            <div
              style="
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <div>{{ item.name }}</div>
              <el-button
                type="danger"
                :icon="Delete"
                circle
                @click="Deltag(item.id)"
              />
            </div>
          </template>
          <img :src="item.src" style="width: 100%" />
        </el-card>
      </div>
    </div>

    <el-dialog v-model="dialogVisible" title="增加标签" width="500">
      <el-input
        v-model="input"
        style="width: 60%; margin-bottom: 20px"
        placeholder="请输入标签名"
      />
      <el-upload
        action="http://8.146.208.139:3000/upload"
        method="post"
        v-model:file-list="fileList"
        list-type="picture-card"
        :before-upload="beforePicUpload"
        multiple="true"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleUpImage"
        :http-request="HandleHttprequest"
        auto-upload="true"
        accept=".jpg,.png"
        limit="1"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="Cancel">取消</el-button>
          <el-button type="primary" @click="upload"> 增加 </el-button>
        </div>
      </template>
    </el-dialog>
  </page-contain>
</template>

<!-- <style lang="scss" scoped>
.el-tag {
  margin: 1%;
}
</style> -->
