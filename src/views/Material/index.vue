<template>
  <div>
    <el-card class="box-card">
      <!-- 卡片 -->
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
        <show-image :showAddImage="true" :showFoot="true"/>
      </div>
    </el-card>
  </div>
</template>
<script>
import showImage from '@/components/showImage'
export default {
  data() {
    return {
      
    };
  },
  components: {
    showImage
  },
  methods: {
    
  },
  created() {
    
  }
}
</script>

<style>

</style>
