<script setup>
import { onMounted, ref } from 'vue'
let input = ref('')
let premissions = ref('')
let searchType = ref('')
let UserList = ref([
  {
    uid: 1,
    userName: 'Ye',
    phonenumber: '15767807233',
    sex: '男',
    avatar: 'http://8.146.208.139:3000/avator/1709974133978.jpg',
    status: 0,
    type: 1
  },
  {
    uid: 1,
    userName: 'Ye',
    phonenumber: '15767807233',
    sex: '男',
    avatar: 'http://8.146.208.139:3000/avator/1709974133978.jpg',
    status: 0,
    type: 1
  },
  {
    uid: 1,
    userName: 'Ye',
    phonenumber: '15767807233',
    sex: '男',
    avatar: 'http://8.146.208.139:3000/avator/1709974133978.jpg',
    status: 0,
    type: 1
  },
  {
    uid: 1,
    userName: 'Ye',
    phonenumber: '15767807233',
    sex: '男',
    avatar: 'http://8.146.208.139:3000/avator/1709974133978.jpg',
    status: 0,
    type: 1
  },
  {
    uid: 1,
    userName: 'Ye',
    phonenumber: '15767807233',
    sex: '男',
    avatar: 'http://8.146.208.139:3000/avator/1709974133978.jpg',
    status: 0,
    type: 1
  }
])
onMounted(() => {
  console.log('11')
})
</script>
<template>
  <page-contain title="用户管理">
    <el-form inline>
      <el-form-item label="权限">
        <el-select v-model="premissions">
          <el-option label="管理员" value="0"></el-option>
          <el-option label="普通用户" value="1"></el-option>
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
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="UserList" width="100%">
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
        prop="phonenumber"
        align="center"
        width="220"
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
      <el-table-column label="权限" prop="status" align="center" width="250">
        <template #default="{ row }">
          <el-tag type="primary" v-if="row.type == 1">管理员</el-tag>
          <el-tag type="success" v-else>普通用户</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250">
        <template #default="{ row }">
          <el-button type="info" round v-if="row.type == 1"
            >取消管理员</el-button
          >
          <el-button type="primary" round v-else>设为管理员</el-button>
          <el-button type="danger" round v-if="row.status == 0">封禁</el-button>
          <el-button type="warning" round v-else>解禁</el-button>
        </template>
      </el-table-column>
    </el-table>
  </page-contain>
</template>
<style scoped></style>
