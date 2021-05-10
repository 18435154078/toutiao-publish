<template>
  <div class="content">
    <!-- <img src="@/assets/logo_index.png" class="logo" alt=""> -->
    <el-row class="tac">
      <el-col :span="100">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#002033"
          text-color="#fff"
          active-text-color="gold"
          router
          :collapse="isCollapse"
        >
          <el-menu-item index="/" class="item">
            <i class="el-icon-house"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/content" class="item">
            <i class="el-icon-message"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/material" class="item">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/article" class="item">
            <i class="el-icon-position"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/comment" class="item">
            <i class="el-icon-chat-dot-square"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/fans" class="item">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/personal" class="item">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import '@/css/global.css'
export default {
  data () {
    return {
    }
  },
  props: ['is-collapse'],
  methods: {
  },
  mounted() {
    // console.log($route.path)
  }
}
</script>

<style lang="css" scoped>
/* .el-menu-vertical-demo{
  width: 100%;
} */
.content,.tac{
  background: #002033;
  height: 100%;
  overflow: hidden;
  z-index: 999;
}
.item{
  text-align:left;
  /* padding-left: 20px !important;
  padding-right: 30px !important; */
}
.tac{
  position: fixed;
  left: 0;
  top: 0;
}
</style>
