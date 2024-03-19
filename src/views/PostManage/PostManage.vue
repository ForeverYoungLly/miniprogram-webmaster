<script setup>
import { onMounted, ref } from 'vue'
import {
  showPostDetail,
  showPost,
  postComment,
  deletePost
} from '../../api/api'
import { ElMessage } from 'element-plus'
import { ArrowDownBold } from '@element-plus/icons-vue'
const selectedType = ref('')
const selectedStatus = ref('')
let CommentTotal = ref(0)
let CommentPageNum = ref(1)
let loading = ref(false)
let total = ref(0)
let pageSize3 = 7
let nowPostId = ref('')
let commentList = ref([])
let input = ref('')
let form = ref({
  title: '',
  nickname: '',
  meetAddress: '',
  status: 0,
  tag: '',
  imgList: [],
  beginTime: '',
  endTime: '',
  content: ''
})
let drawer = ref(false) //控制大抽屉
let innerDrawer = ref(false) //控制小抽屉
const TypeList = ref([
  {
    label: '篮球',
    value: 1
  },
  {
    label: '足球',
    value: 2
  },
  {
    label: '排球',
    value: 3
  },
  {
    label: '羽毛球',
    value: 4
  },
  {
    label: '游泳',
    value: 5
  },
  {
    label: '健身',
    value: 6
  },
  {
    label: '拼车',
    value: 7
  },
  {
    label: '演唱会',
    value: 8
  },
  {
    label: '拼单',
    value: 9
  },
  {
    label: '旅行',
    value: 10
  },
  {
    label: '学习',
    value: 11
  },
  {
    label: '其他',
    value: 12
  }
])
let PostList = ref([])
const ShowDetail = (id) => {
  loading.value = true
  CommentTotal.value = 0
  nowPostId.value = id
  form.value = {}
  commentList.value = []
  showPostDetail(id)
    .then((res) => {
      console.log(res)
      console.log(splitImg(res.data.content))
      form.value = {
        title: res.data.title,
        nickname: res.data.posterUsername,
        meetAddress: res.data.meetAddress,
        status: res.data.status,
        tag: res.data.tags[0].name,
        urls: splitImg(res.data.content).imgList,
        beginTime: formatDateTime(res.data.beginTime),
        endTime: formatDateTime(res.data.endTime),
        content: splitImg(res.data.content).content
      }
      loading.value = false
      drawer.value = true
    })
    .catch((err) => {
      console.log(err)
      loading.value = false
      ElMessage.error('获取错误')
    })
}
const refresh = () => {
  input.value = ''
  selectedStatus.value = ''
  selectedType.value = ''
}
const GetPost = (data) => {
  loading.value = true
  showPost(data)
    .then((res) => {
      loading.value = false
      if (res.code != '200') {
        ElMessage.error('获取失败')
      } else {
        total.value = res.data.total
        PostList.value = []
        res.data.rows.forEach((item) => {
          PostList.value.push({
            id: item.id,
            avatar: item.posterAvatar,
            nickname: item.posterUsername,
            title: item.title,
            type: item.tags[0].name,
            status: item.status
          })
        })
      }
    })
    .catch((err) => {
      loading.value = false
      ElMessage.error('获取失败')
      console.log(err)
    })
}
onMounted(() => {
  CommentPageNum.value=1
  let data = {
    pageNum: 1,
    pageSize: 7,
    status: 0
  }
  GetPost(data)
})
const handleCurrentChange = (num) => {
  // console.log(num)
  let data = ref('')
  if (selectedStatus.value == '' && selectedType.value == '') {
    data.value = {
      pageNum: num,
      pageSize: 7,
      q: input.value
    }
  } else if (selectedStatus.value != '' && selectedType.value == '') {
    data.value = {
      pageNum: num,
      pageSize: 7,
      status: selectedStatus,
      q: input.value
    }
  } else if (selectedStatus.value == '' && selectedType.value != '') {
    data.value = {
      pageNum: num,
      pageSize: 7,
      tagid: selectedType,
      q: input.value
    }
  } else {
    data.value = {
      pageNum: num,
      pageSize: 7,
      status: selectedStatus,
      tagid: selectedType,
      q: input.value
    }
  }
  GetPost(data.value)
}
const Search = () => {
  let data = ref('')
  if (selectedStatus.value == '' && selectedType.value == '') {
    data.value = {
      pageNum: 1,
      pageSize: 7,
      q: input.value
    }
  } else if (selectedStatus.value != '' && selectedType.value == '') {
    data.value = {
      pageNum: 1,
      pageSize: 7,
      status: selectedStatus.value,
      q: input.value
    }
  } else if (selectedStatus.value == '' && selectedType.value != '') {
    data.value = {
      pageNum: 1,
      pageSize: 7,
      tagId: selectedType.value,
      q: input.value
    }
  } else {
    data.value = {
      pageNum: 1,
      pageSize: 7,
      status: selectedStatus.value,
      tagId: selectedType.value,
      q: input.value
    }
  }
  console.log(data.value)
  GetPost(data.value)
}
const showComment = () => {
  loading.value = true
  let data = {
    postId: nowPostId.value,
    pageNum: CommentPageNum.value,
    pageSize: 7
  }
  console.log(data)
  postComment(data)
    .then((res) => {
      CommentPageNum.value++
      innerDrawer.value = true
      loading.value = false
      console.log(res)
      CommentTotal.value = res.data.total
      res.data.rows.forEach((item) => {
        commentList.value.push({
          nickname: item.username,
          id: item.id,
          avatar: item.avatar,
          content:item.content,
          time: item.createTime.substring(0, 10)
        })
      })
    })
    .catch((err) => {
      console.log(err)
      loading.value = false
      ElMessage.error('获取失败')
    })
}
const splitImg = (StringCon) => {
  //切割图像数组
  let content = StringCon.split('**/img/**')
  let con = content[0] ? content[0].split('**/rank/**')[0] : ''
  let imgList = content[1] ? content[1].split(',') : ''
  let re = {
    imgList: imgList,
    content: con
  }
  return re
}
const showFristComment=()=>{
  CommentPageNum.value=1
  commentList.value=[]
  loading.value = true
  let data = {
    postId: nowPostId.value,
    pageNum: 1,
    pageSize: 7
  }
  console.log(data)
  postComment(data)
    .then((res) => {
      CommentPageNum.value++
      innerDrawer.value = true
      loading.value = false
      console.log(res)
      CommentTotal.value = res.data.total
      res.data.rows.forEach((item) => {
        commentList.value.push({
          nickname: item.username,
          id: item.id,
          avatar: item.avatar,
          content:item.content,
          time: item.createTime.substring(0, 10)
        })
      })
    })
    .catch((err) => {
      console.log(err)
      loading.value = false
      ElMessage.error('获取失败')
    })
    console.log(CommentPageNum.value)
}
//转化时间格式
const formatDateTime = (isoDateTimeString) => {
  const date = new Date(isoDateTimeString)

  const year = date.getFullYear() // 获取年份
  const month = ('0' + (date.getMonth() + 1)).slice(-2) // 获取月份，并确保两位数字
  const day = ('0' + date.getDate()).slice(-2) // 获取日期，并确保两位数字
  const hours = ('0' + date.getHours()).slice(-2) // 获取小时，并确保两位数字
  const minutes = ('0' + date.getMinutes()).slice(-2) // 获取分钟，并确保两位数字
  const seconds = ('0' + date.getSeconds()).slice(-2) // 获取秒钟，并确保两位数字

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
const Del = (id) => {
  ElMessageBox.confirm('是否确定删除?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: '提醒'
  }).then(() => {
    let data = {
      id: id
    }
    deletePost(data)
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
</script>

<template>
  <page-contain title="所有帖子">
    <el-form inline>
      <el-form-item label="帖子分类:">
        <el-select v-model="selectedType" placeholder="请选择">
          <el-option
            v-for="item in TypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态:">
        <el-select v-model="selectedStatus" placeholder="请选择">
          <el-option label="匹配中" value="0"></el-option>
          <el-option label="已完成" value="1"></el-option>
          <el-option label="挂起" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="搜索:">
        <el-input
          v-model="input"
          style="width: 240px"
          placeholder="Please input"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="Search">搜索</el-button>
        <el-button @click="refresh">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格部分 -->
    <el-table :data="PostList" v-loading="loading" width="100%">
      <el-table-column
        label="ID"
        prop="id"
        align="center"
        width="50"
      ></el-table-column>
      <el-table-column label="头像" align="center" width="60">
        <template #default="{ row }">
          <el-avatar :src="row.avatar" />
        </template>
      </el-table-column>
      <el-table-column
        label="作者"
        prop="nickname"
        align="center"
        width="130"
      ></el-table-column>
      <el-table-column
        label="标题"
        prop="title"
        align="center"
        width="350"
      ></el-table-column>
      <el-table-column label="类型" prop="type" align="center" width="150">
        <template #default="{ row }">
          <el-tag type="primary">{{ row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" align="center">
        <template #default="{ row }">
          <el-tag type="primary" v-if="row.status == '0'">匹配中</el-tag>
          <el-tag type="success" v-else>已完成</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button type="primary" round @click="ShowDetail(row.id)"
            >查看</el-button
          >
          <el-button type="danger" round @click="Del(row.id)">删除</el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>

    <!-- 分页 -->
    <div class="fenye">
      <el-pagination
        v-model:current-page="currentPage3"
        v-model:page-size="pageSize3"
        :disabled="disabled"
        :background="background"
        layout="prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange(currentPage3)"
      />
    </div>

    <!-- 右侧抽屉 -->
    <el-drawer v-model="drawer" title="帖子详情" size="50%">
      <div>
        <div class="btns">
          <el-button type="primary" @click="showFristComment">查看评论</el-button>
          <el-button type="danger" @click="del">删除</el-button>
        </div>
        <el-form :model="form" label-width="auto">
          <el-form-item label="标题:">
            <el-text class="mx-1" size="large">{{ form.title }}</el-text>
          </el-form-item>
          <el-form-item label="帖主:">
            <el-text class="mx-1" size="large">{{ form.nickname }}</el-text>
          </el-form-item>
          <el-form-item label="集合地点:">
            <el-text class="mx-1" size="large">{{ form.meetAddress }}</el-text>
          </el-form-item>
          <el-form-item label="状态:">
            <el-tag type="primary" v-if="form.status == 0">匹配完成</el-tag>
            <el-tag type="success" v-else>匹配中</el-tag>
          </el-form-item>
          <el-form-item label="类型:">
            <el-tag type="primary">篮球</el-tag>
          </el-form-item>
          <el-form-item label="开始时间:">
            <el-text class="mx-1" size="large">{{ form.beginTime }}</el-text>
          </el-form-item>
          <el-form-item label="结束时间:">
            <el-text class="mx-1" size="large">{{ form.endTime }}</el-text>
          </el-form-item>
          <el-form-item label="详情:">
            <el-input v-model="form.content" type="textarea" disabled />
          </el-form-item>
          <el-form-item label="图片:">
            <div class="demo-image__lazy" lazy>
              <el-image v-for="url in form.urls" :key="url" :src="url" />
            </div>
          </el-form-item>
        </el-form>

        <!-- 小抽屉内容 -->
        <el-drawer
          v-model="innerDrawer"
          title="评论详情"
          :append-to-body="true"
          :before-close="handleClose"
        >
          <div v-for="(item, index) in commentList" :key="index">
            <CommentCard
              :nickname="item.nickname"
              :id="item.id"
              :avatar="item.avatar"
              :content="item.content"
              :time="item.time"
            ></CommentCard>
          </div>
          <div v-if="CommentTotal > commentList.length" @click="showComment">
            <el-text type="info"
              >查看更多<el-icon><ArrowDownBold /></el-icon
            ></el-text>
          </div>
          <template v-if="commentList.length <= 0">
            <el-empty description="暂无评论" />
          </template>
        </el-drawer>
      </div>
    </el-drawer>
  </page-contain>
</template>
<style scoped>
.fenye {
  margin-top: 5vh;
}
.demo-image__lazy {
  /* height: 400px; */
  overflow-y: auto;
}
.demo-image__lazy .el-image {
  display: block;
  /* min-height: 200px; */
  margin-bottom: 10px;
}
.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}
.btns {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.name {
  margin-left: 2px;
  margin-right: 2px;
}
.content {
  display: flex;
  align-items: center;
}
.son_comment {
  margin-left: 10px;
  margin-top: 5px;
}
</style>
