<script setup>
import { onMounted, ref } from 'vue'
import { DeleteFilled } from '@element-plus/icons-vue'
import { showPost } from '../../api/api'
const selectedType = ref('')
const selectedStatus = ref('0')
let drawer = ref(true)
let innerDrawer = ref(true)
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
let PostList = ref([
  {
    nickname: 'Ye',
    title: '打篮球拉',
    type: '篮球',
    status: '匹配中',
    avatar: 'http://8.146.208.139:3000/avator/1709974133978.jpg'
  },
  {
    nickname: 'Ye',
    title: '打篮球拉',
    type: '篮球',
    status: '匹配中',
    avatar: 'http://8.146.208.139:3000/avator/1709974133978.jpg'
  },
  {
    nickname: 'Ye',
    title: '打篮球拉',
    type: '篮球',
    status: '匹配中',
    avatar: 'http://8.146.208.139:3000/avator/1709974133978.jpg'
  },
  {
    nickname: 'Ye',
    title: '打篮球拉',
    type: '篮球',
    status: '匹配中',
    avatar: 'http://8.146.208.139:3000/avator/1709974133978.jpg'
  },
  {
    nickname: 'Ye',
    title: '打篮球拉',
    type: '篮球',
    status: '匹配中',
    avatar: 'http://8.146.208.139:3000/avator/1709974133978.jpg'
  },
  {
    nickname: 'Ye',
    title: '打篮球拉',
    type: '篮球',
    status: '匹配中',
    avatar: 'http://8.146.208.139:3000/avator/1709974133978.jpg'
  },
  {
    nickname: 'Ye',
    title: '打篮球拉',
    type: '篮球',
    status: '匹配中',
    avatar: 'http://8.146.208.139:3000/avator/1709974133978.jpg'
  },
  {
    nickname: 'Ye',
    title: '打篮球拉',
    type: '篮球',
    status: '匹配中',
    avatar: 'http://8.146.208.139:3000/avator/1709974133978.jpg'
  }
])
const urls = ref([
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
])
let form = ref({
  title: '打篮球哇',
  nickname: 'Ye',
  meetAddress: '松山湖体育馆',
  status: 0,
  tag: '篮球'
})
onMounted(() => {
  showPost()
})
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
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格部分 -->
    <el-table :data="PostList" width="100%">
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
          <el-tag type="primary" v-if="row.status == '匹配中'">{{
            row.status
          }}</el-tag>
          <el-tag type="success" v-else>{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button type="primary" round>查看</el-button>
          <el-button type="danger" round>删除</el-button>
        </template>
      </el-table-column>

      <template #emit>
        <el-empty description="description" />
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
        :total="100"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
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
