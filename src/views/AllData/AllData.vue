<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts/core'
import { GridComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([GridComponent, BarChart, CanvasRenderer])

const source = ref(1200)

onMounted(() => {
  var myChart = echarts.init(document.getElementById('main'))
  const option = {
    xAxis: {
      data: [
        '篮球',
        '足球',
        '排球',
        '羽毛球',
        '游泳',
        '健身',
        '拼车',
        '演唱会',
        '旅游',
        '学习',
        '其他'
      ]
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: [23, 24, 18, 25, 27, 28, 25, 30, 20, 30, 10]
      }
    ]
  }
  myChart.setOption(option)
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
        <el-statistic title="用户数量" :value="source" />
      </el-col>
      <el-col :span="12">
        <el-statistic title="帖子数量" :value="source" />
      </el-col>
    </el-row>
    <div id="main" style="width: 100%; height: 50vh"></div>
  </page-contain>
</template>
