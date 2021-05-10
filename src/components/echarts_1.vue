<template>
    <div>
        <!-- 1. 首先需要有一个具备大小的实例 -->
        <div ref="Echarts_1" id="Echarts"></div>
    </div>
</template>

<script>
// 2. 加载echarts
import * as echarts from 'echarts'
export default {
  name: 'Echarts_1',
  data() {
    return {
            
    }
  },
  mounted() {
    this.loadEcharts()
  },
  methods: {
    loadEcharts(){
      // 3. 初始化echarts实例
      let myChart = echarts.init(this.$refs.Echarts_1)
      let option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }]
            }
            myChart.setOption(option)
        }
    }
}
</script>

<style scoped>
#Echarts{
    width:400px;
    height: 300px;
}
</style>