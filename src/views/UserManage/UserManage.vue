<script setup>
import { onMounted, ref } from 'vue'
import { postUser, banUser, releaseUser, addAdmin, delAdmin } from '@/api/api'
let input = ref('')
let premissions = ref('')
let searchType = ref('')
let UserList = ref([])
let pageNum = ref(1) //页数
const loading = ref(false)
let totalNum = ref(0)
let pageSize = 8
const getUser = (data) => {
  loading.value = true
  postUser(data)
    .then((res) => {
      loading.value = false
      if (res.code != 200) {
        ElMessage.error('获取失败')
      } else {
        let list = res.data.rows
        list.forEach(function (element) {
          if (element.sex === 0) element.sex = '男'
          else element.sex = '女'
        })
        UserList.value = res.data.rows
        totalNum.value = res.data.total
      }
    })
    .catch((err) => {
      ElMessage.error('获取失败')
      loading.value = false
      console.log(err)
    })
}
onMounted(() => {
  let data = {
    pageNum: pageNum.value,
    pageSize: pageSize
  }
  getUser(data)
})
//取消管理员
const CancelManger = (uid) => {
  loading.value = true
  let data = {
    uid: uid,
    type: 0
  }
  delAdmin(data)
    .then((res) => {
      loading.value = false
      console.log(res)
      ElMessage({
        message: '修改成功',
        type: 'success'
      })
      let data = {
        pageNum: pageNum.value,
        pageSize: pageSize
      }
      getUser(data)
    })
    .catch((err) => {
      loading.value = false
      console.log(err)
      ElMessage.error('修改失败')
    })
}
//设置管理员
const SetManager = (uid) => {
  loading.value = true
  let data = {
    uid: uid,
    type: 1
  }
  addAdmin(data)
    .then((res) => {
      loading.value = false
      console.log(res)
      ElMessage({
        message: '修改成功',
        type: 'success'
      })
      let data = {
        pageNum: pageNum.value,
        pageSize: pageSize
      }
      getUser(data)
    })
    .catch((err) => {
      loading.value = false
      console.log(err)
      ElMessage.error('修改失败')
    })
}
//设置禁用
const BanUser = (uid) => {
  loading.value = true
  let data = {
    uid: uid,
    status: 1
  }
  banUser(data)
    .then((res) => {
      ElMessage({
        message: '修改成功',
        type: 'success'
      })
      loading.value = false
      console.log(res)
      let data = {
        pageNum: pageNum.value,
        pageSize: pageSize
      }
      getUser(data)
    })
    .catch((err) => {
      loading.value = false
      console.log(err)
      ElMessage.error('禁用失败')
    })
}
//取消禁用
const CancelBan = (uid) => {
  loading.value = true
  let data = {
    uid: uid,
    status: 0
  }
  releaseUser(data)
    .then((res) => {
      ElMessage({
        message: '修改成功',
        type: 'success'
      })
      loading.value = false
      console.log(res)
      let data = {
        pageNum: pageNum.value,
        pageSize: pageSize
      }
      getUser(data)
    })
    .catch((err) => {
      loading.value = false
      console.log(err)
      ElMessage.error('禁用失败')
    })
}
//分页换页
const handleCurrentChange = (num) => {
  // console.log(num)
  let data = ref({})
  if (searchType.value == 0) {
    data.value = {
      pageNum: num,
      pageSize: pageSize,
      type: premissions.value,
      userName: input.value
    }
  } else {
    data.value = {
      pageNum: num,
      pageSize: pageSize,
      type: premissions.value,
      uid: input.value
    }
  }
  getUser(data.value)
}
//搜索
const Search = () => {
  let data = ref({})
  if (searchType.value == 0) {
    data.value = {
      pageNum: 1,
      pageSize: pageSize,
      type: premissions.value,
      userName: input.value
    }
  } else {
    data.value = {
      pageNum: 1,
      pageSize: pageSize,
      type: premissions.value,
      uid: input.value
    }
  }
  getUser(data.value)
}
//重置
const refresh = () => {
  searchType.value = ''
  premissions.value = ''
  input.value = ''
}
</script>
<template>
  <page-contain title="用户管理">
    <el-form inline>
      <el-form-item label="权限">
        <el-select v-model="premissions">
          <el-option label="管理员" value="1"></el-option>
          <el-option label="普通用户" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="searchType">
          <el-option label="昵称" value="0"></el-option>
          <el-option label="ID" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="搜索:">
        <el-input
          v-model="input"
          style="width: 240px"
          placeholder="请输入搜索关键词"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="Search">搜索</el-button>
        <el-button @click="refresh">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="UserList" width="100%" v-loading="loading">
      <el-table-column
        label="ID"
        prop="uid"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column label="头像" align="center" width="100">
        <template #default="{ row }">
          <el-avatar :src="row.avatar" />
        </template>
      </el-table-column>
      <el-table-column
        label="昵称"
        prop="userName"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        label="手机号"
        prop="phoneNumber"
        align="center"
        width="170"
      ></el-table-column>
      <el-table-column
        label="性别"
        prop="sex"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column label="状态" prop="status" align="center" width="150">
        <template #default="{ row }">
          <el-tag type="success" v-if="row.status == 0">账号正常</el-tag>
          <el-tag type="danger" v-else>账号已封禁</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="权限" prop="status" align="center" width="100">
        <template #default="{ row }">
          <el-tag type="primary" v-if="row.type == 1">管理员</el-tag>
          <el-tag type="success" v-else>普通用户</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250">
        <template #default="{ row }">
          <el-button
            type="info"
            round
            v-if="row.type == 1"
            @click="CancelManger(row.uid)"
            >取消管理员</el-button
          >
          <el-button type="primary" round v-else @click="SetManager(row.uid)"
            >设为管理员</el-button
          >
          <el-button
            type="danger"
            round
            v-if="row.status == 0"
            @click="BanUser(row.uid)"
            >封禁</el-button
          >
          <el-button type="warning" round v-else @click="CancelBan(row.uid)"
            >解禁</el-button
          >
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>
    <!-- f分页 -->
    <div class="fenye">
      <el-pagination
        v-model:current-page="currentPage3"
        v-model:page-size="pageSize"
        :background="background"
        layout="prev, pager, next, jumper"
        :total="totalNum"
        @current-change="handleCurrentChange(currentPage3)"
      />
    </div>
  </page-contain>
</template>
<style scoped>
.fenye {
  margin-top: 5vh;
}
</style>
