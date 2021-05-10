<template>
    <div>
        <img src="@/assets/login_bg.jpg" alt="" class="bg">
        <div class="login-container">
            <img src="@/assets/logo_index.png" alt="" class="logo">
            <el-form ref="ruleForm" :model="form" :rules="rules">
                <!-- 手机号 -->
                <el-form-item prop="mobile">
                    <el-input
                        v-model="form.mobile"
                        placeholder="请输入手机号"
                    ></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="code">
                    <el-input
                        v-model="form.code"
                        placeholder="请输入验证码"
                    ></el-input>
                </el-form-item>
                <!-- 同意协议 -->
                <el-form-item prop="agree" class="isChecked" >
                    <el-checkbox v-model="form.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                <!-- button -->
                <el-form-item>
                    <el-button
                      type="primary"
                      class="btn"
                      @click="onLogin"
                      :loading="loginLoading"
                    >登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import '@/css/global.css'
import { login } from '@/api/user'
export default {
  name: 'login',
  data () {
    return {
      form: {
        mobile: '13911111111', // 手机号
        code: '246810', // 验证码
        agree: false // 是否同意协议
      },
      loginLoading: false,
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // 验证手机号格式
          // { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          // { min: 6, max: 6, message: '长度在 6 个字符', trigger: 'blur' }
        ],
        agree: [
          {
            // 自定义校验规则
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意协议'))
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      // 提交时需要处理的内容
      // 1. 获取表单数据
      const form = this.form
      // 2. 表单验证
      this.$refs['ruleForm'].validate(valid => {
        if (!valid) {
        } else {
          // 3. 验证通过，提交登录
          this.loginLoading = true
          login(form).then(res => {
            // console.log(res.data.data)
            this.$message({
              message: '恭喜你，登录成功',
              type: 'success',
              duration: '1000'
            })
            this.loginLoading = false
            window.localStorage.setItem('user', JSON.stringify(res.data.data))
            // 路径跳转
            // this.$router.push('/home')
            // 命名路由跳转
            this.$router.push({
              name: 'Home'
            })
          }).catch(err => {
            console.log('出错了', err)
            this.$message.error({
              message: '手机号或密码错误',
              duration: '1000'
            })
            this.loginLoading = false
            // this.form.agree = false
          })
        }
      })
      // 4. 处理后端响应: 成功; 失败
    }
  }
}
</script>
<style scoped lang="css">
.login-container{
    width:300px;
    height:290px;
    padding:20px 40px;
    border-radius: 5px;
    background-color:#fff;
    position: absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    margin: auto;
    text-align: center;
}
.bg{
    width:100%;
    height:100%;
    position: fixed;
    left:0;
    top:0;;
    z-index:-1;
}
.btn{
    width:100%;
    /* margin-left: -80px; */
}
.logo{
    width: 200px;
    margin-bottom: 10px;
}
.isChecked{
    text-align: left;
}
</style>
