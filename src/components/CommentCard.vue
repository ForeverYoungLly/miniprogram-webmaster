<script setup>
import { DeleteFilled, ArrowDownBold } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { SonComment ,deleteComment} from '../api/api'
const props = defineProps({
  nickname: {
    required: true,
    type: String
  },
  id: {
    required: true,
    type: String
  },
  avatar: {
    required: true,
    type: String
  },
  content: {
    required: true,
    type: String
  },
  time: {
    required: true,
    type: String
  }
})
let SonCommenTotal = ref(0)
let SonCommentPage = ref(1)
let son_comment = ref([])
onMounted(() => {
  SonCommentPage.value=1
  son_comment.value=[]
  getSonComment()
})
const Del=(id)=>{
  ElMessageBox.confirm('是否确定删除?', '提醒', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: '提醒'
  }).then(() => {
    let data = {
      commentId: id
    }
    deleteComment(data)
      .then((res) => {
        if (res.code != 200) {
          ElMessage.error('删除失败')
        } else {
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
        }
      })
      .catch((err) => {
        console.log(err)
        ElMessage.error('删除失败')
      })
  })
}
const getSonComment = () => {
  let data = {
    commentId: props.id,
    pageSize: 5,
    pageNum: SonCommentPage.value
  }
  SonComment(data).then((res) => {
    SonCommentPage.value++
    console.log(res)
    SonCommenTotal.value=res.data.total
    res.data.rows.forEach(item=>{
      son_comment.value.push({
        content:item.content,
        avatar:item.avatar,
        name:item.username,
        id:item.id,
        toCommentUserName:item.toCommentUserName
      })
    })
   
  })
}
</script>
<template>
  <el-card style="max-width: 500px; margin-top: 1vh">
    <div style="display: flex; align-items: center">
      <el-avatar :size="30" :src="avatar" />
      <el-text class="mx-1 name" size="large">{{ nickname }}</el-text>
    </div>
    <div class="con">
      <el-text class="mx-1 content">&nbsp;&nbsp;{{ content }}</el-text>
    </div>
    <div
      class="btn"
      style="display: flex; justify-content: right; margin-top: 3px"
    >
      <el-icon style="margin-left: 10px" @click="Del(id)"><DeleteFilled /></el-icon
      ><el-text class="mx-1 name" type="danger" size="small">{{
        time
      }}</el-text>
    </div>
    <div v-for="(item, index) in son_comment" :key="index" class="text item">
      <div class="son_comment">
        <div class="head">
          <el-avatar :size="20" :src="item.avatar" />
          <el-text size="small" style="margin: 0 4px">{{ item.name }}</el-text>
          <el-text type="primary" size="small">&nbsp;回复&nbsp;</el-text>
          <el-text size="small" style="margin: 0 4px">{{ item.toCommentUserName }}</el-text>
        </div>
        <el-text type="Info" size="small" class="content"
          >&nbsp;&nbsp;&nbsp;&nbsp;{{item.content}}<el-icon
            style="margin-left: 5px" @click="Del(item.id)"
            ><DeleteFilled /></el-icon
        ></el-text>
      </div>
    </div>
    <div v-if="SonCommenTotal>son_comment.length" @click="getSonComment">
      <el-text size="small" type="info"
        >查看更多<el-icon><ArrowDownBold /></el-icon
      ></el-text>
    </div>
  </el-card>
</template>
<style scoped>
.head {
  display: flex;
  align-items: center;
}
</style>
