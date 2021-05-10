<template>
  <div>
    <el-container class="layout">
      <el-aside class="aside" :width="isCollapse ? '50px' : '120px'">
        <Aside :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header class="header">
          <i
            :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            @click="collapse"
          ></i>
          <b class="header_text">江苏传智播客科技教育有限公司</b>
          <el-row class="block-col-2">
            <el-col :span="12" class="push-down">
              <img class="touxiang" :src="photo" alt="" />
              <el-dropdown class="el-dropdown">
                <span>{{ name }}</span>
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    icon="el-icon-setting"
                    @click.native="persional"
                    >个人设置</el-dropdown-item
                  >
                  <el-dropdown-item icon="el-icon-unlock" @click.native="logout"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-header>
        <el-main class="main">
          <keep-alive>
            <router-view />
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Aside from "@/components/aside"
import { getUserProfile } from "@/api/user"
import bus from '@/utils/global-bus'
export default {
  data() {
    return {
      name: "",
      photo: "",
      isCollapse: false,
    }
  },
  components: {
    Aside,
  },
  methods: {
    loaderUserProfile() {
      getUserProfile().then((res) => {
        this.name = res.data.data.name;
        this.photo = res.data.data.photo;
        // console.log(res)
      });
    },
    logout() {
      this.$confirm("是否退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$router.push({
            name: "Login",
          });
          window.localStorage.removeItem("user");
        })
        .catch(() => {});
    },
    collapse() {
      this.isCollapse = !this.isCollapse;
    },
    persional() {
      this.$router.push("/personal");
    },
  },
  mounted() {
    // 通过中央时间总线，将自改后的头像和昵称传给layout组件，并进行更新
    bus.$on('undate-user', user => {
      this.name = user.name
      this.photo = user.photo
    })
    this.loaderUserProfile();
    var isLogin = window.localStorage.getItem("user");
    if (!isLogin) {
      this.$router.push("/login");
    }
  },
};
</script>

<style lang="css" scoped>
.layout {
  display: flex;
}
/* 顶部栏 */
.header {
  /* background-color: #b3c0d1; */
  color: #333;
  line-height: 60px;
  height: 60px;
  font-size: 20px;
}
.el-icon-s-fold,
.el-icon-s-unfold {
  float: left;
  margin-top: 20px;
  margin-right: 10px;
}
.header_text {
  font-size: 15px;
  float: left;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.block-col-2 {
  float: right;
}
.touxiang {
  width: 25px;
  height: 25px;
  margin-right: 15px;
  border-radius: 50%;
}
.push-down {
  display: flex;
  align-items: center;
}
/* 侧边栏 */
.aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 100vh;
  min-height: 100vh;
  overflow: auto;
  /* min-width: 65px; */
}
.main {
  background-color: #e9eef3;
  color: #333;
}
.el-menu-vertical-demo {
  width: 100%;
}
.el-menu-item {
  width: 100%;
}
</style>
