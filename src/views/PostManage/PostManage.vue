<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { showPostDetail } from '../../api/api'
import { DeleteFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const selectedType = ref('')
const selectedStatus = ref('')
let loading = ref(false)
let total = ref(0)
let pageSize3 = 8
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
    value: 0
  },
  {
    label: '足球',
    value: 1
  },
  {
    label: '排球',
    value: 2
  },
  {
    label: '羽毛球',
    value: 3
  },
  {
    label: '游泳',
    value: 4
  },
  {
    label: '健身',
    value: 5
  },
  {
    label: '拼车',
    value: 6
  },
  {
    label: '演唱会',
    value: 7
  },
  {
    label: '拼车',
    value: 8
  },
  {
    label: '旅行',
    value: 9
  },
  {
    label: '学习',
    value: 10
  },
  {
    label: '其他',
    value: 11
  }
])
let PostList = ref([])
const ShowDetail = (id) => {
  loading.value = true
  showPostDetail(id)
    .then((res) => {
      console.log(res)
      console.log(splitImg(res.data.content))
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
  axios({
    method: 'POST',
    data: data,
    url: 'http://8.146.208.139:10010/post/manage/list',
    headers: {
      'Content-Type': 'application/json',
      access_token: JSON.parse(localStorage.getItem('token')).accessToken
    }
  })
    .then((res) => {
      loading.value = false
      if (res.data.code != '200') {
        ElMessage.error('获取失败')
      } else {
        total.value = res.data.data.total
        PostList.value = []
        res.data.data.rows.forEach((item) => {
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
  let data = {
    pageNum: 1,
    pageSize: 8,
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
      pageSize: 8,
      q: input.value
    }
  } else if (selectedStatus.value != '' && selectedType.value == '') {
    data.value = {
      pageNum: num,
      pageSize: 8,
      status: selectedStatus,
      q: input.value
    }
  } else if (selectedStatus.value == '' && selectedType.value != '') {
    data.value = {
      pageNum: num,
      pageSize: 8,
      tagid: selectedType,
      q: input.value
    }
  } else {
    data.value = {
      pageNum: num,
      pageSize: 8,
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
      pageSize: 8,
      q: input.value
    }
  } else if (selectedStatus.value != '' && selectedType.value == '') {
    data.value = {
      pageNum: 1,
      pageSize: 8,
      status: selectedStatus,
      q: input.value
    }
  } else if (selectedStatus.value == '' && selectedType.value != '') {
    data.value = {
      pageNum: 1,
      pageSize: 8,
      tagid: selectedType,
      q: input.value
    }
  } else {
    data.value = {
      pageNum: 1,
      pageSize: 8,
      status: selectedStatus,
      tagid: selectedType,
      q: input.value
    }
  }
  GetPost(data.value)
}
const splitImg = (StringCon) => {
  //切割图像数组
  let content = StringCon.split('**/img/**')
  let con = content[0].split('**/rank/**')[0]
  let imgList = content[1].split(',')
  let re = {
    imgList: imgList,
    content: con
  }
  return re
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
      <el-table-column label="头像" align="center" width="80">
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
      <el-table-column label="类型" prop="type" align="center" width="200">
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
          <el-button type="danger" round @click="Show(row.id)">删除</el-button>
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
          <el-button type="primary">查看评论</el-button>
          <el-button type="danger">删除</el-button>
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
            <el-input v-model="form.content" type="textarea" />
          </el-form-item>
          <el-form-item label="图片:">
            <div class="demo-image__lazy">
              <el-image v-for="url in urls" :key="url" :src="url" />
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
          <div>
            <el-card style="max-width: 500px">
              <div style="display: flex; align-items: center">
                <el-avatar
                  :size="30"
                  src="http://8.146.208.139:3000/avator/1709974133978.jpg"
                />
                <el-text class="mx-1 name" size="large">Info:</el-text>
                <el-text class="mx-1 content" size="large"
                  >一起去玩呀<el-icon style="margin-left: 5px"
                    ><DeleteFilled /></el-icon
                ></el-text>
              </div>
              <div v-for="o in 2" :key="o" class="text item">
                <div class="son_comment">
                  <el-text size="small">xxx</el-text>
                  <el-text type="primary" size="small"
                    >&nbsp;回复&nbsp;</el-text
                  >
                  <el-text size="small">xxx:</el-text>
                  <el-text type="Info" size="small" class="content"
                    >&nbsp;&nbsp;&nbsp;&nbsp;我觉得可以啊，一起走吧！<el-icon
                      style="margin-left: 5px"
                      ><DeleteFilled /></el-icon
                  ></el-text>
                </div>
              </div>
            </el-card>
          </div>
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
