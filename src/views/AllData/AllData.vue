<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts/core'
import { GridComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([GridComponent, BarChart, CanvasRenderer])
import { showData ,postUser} from '../../api/api'
const UserNum = ref(0)
const PostNum=ref(0)

onMounted(() => {
  let tagName = ref([])
  let tagNum = ref([])
  var myChart = echarts.init(document.getElementById('main'))
  showData()
    .then((res) => {
      console.log(res)
      res.data.forEach((item) => {
        tagName.value.push(item.tagName)
        tagNum.value.push(item.total)
        PostNum.value+=item.total
      })
      const option = {
        xAxis: {
          data: tagName.value
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: tagNum.value
          }
        ]
      }
      window.addEventListener('resize', function () {
        //执行
        myChart.resize()
      })

      myChart.setOption(option)
    })
    .catch((err) => {
      ElMessage.error('获取失败')
      console.log(err)
    })
    let data={
      pageNum:1,
      pageSize:1
    }
    postUser(data).then(res=>{
      UserNum.value=res.data.total
      console.log(res)
    }).catch(err=>{
      console.log(err)
      ElMessage.error('获取失败')
    })
    // showPost(data).then(res=>{
    //   PostNum.value=res.data.total
    //   console.log(res)
    // }).catch(err=>{
    //   console.log(err)
    //   ElMessage.error('获取失败')
    // })
})
</script>
<style scoped>
.el-col {
  text-align: center;
}
</style>
<template>
  <page-contain title="用户数据">
    <el-row>
      <el-col :span="12">
<<<<<<< HEAD
        <el-statistic title="用户数量" :value="UserNum" />
      </el-col>
      <el-col :span="12">
        <el-statistic title="帖子数量" :value="PostNum" />
=======
        <el-statistic title="用户数量" :value="source" />
      </el-col>
      <el-col :span="12">
        <el-statistic title="帖子数量" :value="source" />
>>>>>>> b00c5fd5be45f41a3cf8463988f19ee45b7bab2d
      </el-col>
    </el-row>
    <div id="main" style="width: 100%; height: 50vh"></div>
  </page-contain>
</template>
