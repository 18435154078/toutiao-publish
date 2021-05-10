<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>粉丝列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="粉丝列表" name="first">
            <ul class="fansList">
              <li class="fansItem" v-for="(item, index) in fansList" :key="item.id">
                <img :src="item.photo" class="fansAvater"/>
                <div class="fansNeckname">{{ item.name }}</div>
                <el-button type="primary" size="mini" class="fansFocus">关注</el-button>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="粉丝管理" name="second">
            <Echarts />
            <Echarts2 />
            <Echarts3 />
            <Echarts4 />
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import {loadFans} from '@/api/fans'
import Echarts_1 from '@/components/echarts_1'
import Echarts_2 from '@/components/echarts_2'
import Echarts_3 from '@/components/echarts_3'
import Echarts_4 from '@/components/echarts_4'
export default {
  data(){
    return {
      pages: {
        page: 1,
        per_page: 20
      },
      fansList: {},
      activeName: 'first'
    }
  },
  methods: {
    // 获取粉丝列表
    loadFansList(){
      loadFans(this.pages).then(res => {
        this.fansList = res.data.data.results
      })
    }
  },
  components: {
    Echarts: Echarts_1,
    Echarts2: Echarts_2,
    Echarts3: Echarts_3,
    Echarts4: Echarts_4
  },
  mounted () {
    this.loadFansList()
  }
}
</script>

<style>
.fansList {
  overflow: hidden;
  padding: 0;
  margin: 0;
}
.fansAvater {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: block;
  margin: 10px auto;
}
.fansNeckname {
  margin: 15px auto;
  font-size: 12px;
}
.fansItem {
  width: 100px;
  float: left;
  list-style: none;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}
.fansFocus {
  margin: 0 auto 10px;
}
</style>
