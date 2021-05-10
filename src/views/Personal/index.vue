<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="footer">
        <el-form :model="setForm" :rules="rules" ref="setForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="编号">
            {{setForm.id}}
          </el-form-item>
          <el-form-item label="手机">
            {{setForm.mobile}}
          </el-form-item>
          <el-form-item label="媒体名称" prop="name">
            <el-input v-model="setForm.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍" prop="intro">
            <el-input type="textarea" v-model="setForm.intro"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="setForm.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('setForm')">保存</el-button>
          </el-form-item>
        </el-form>
        <div style="text-align:center;margin:60px auto;cursor: pointer" @click="$refs.file.click()">
          <el-image
            style="width: 150px; height: 150px;display:block"
            :src="setForm.photo"
            class="avatar"
            >
          </el-image>
          <p>点击更换头像</p>
          <input type="file" hidden ref="file" @change="fileChange()"/>
        </div>
      </div>
    </el-card>
    <el-dialog
      title="头像选取"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
      style="text-align:center"
      >
      <!-- <img :src="dialogUrl" width="180"/> -->
      <div class="cropper">
        <vue-cropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.outputSize"
            :outputType="option.outputType"
            :info="option.info"
            :canScale="option.canScale"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :full="option.full"
            :fixedBox="option.fixedBox"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :centerBox="option.centerBox"
            :height="option.height"
            :infoTrue="option.infoTrue"
            :maxImgSize="option.maxImgSize"
            :enlarge="option.enlarge"
            :mode="option.mode"
            @imgLoad="imgLoad">
        </vue-cropper>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false;uploadImg()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserProfile, setUserAvater, undateUserProfile } from "@/api/user"
import { VueCropper }  from 'vue-cropper' 
import { uploadImage } from '@/api/image'
import bus from '@/utils/global-bus'
export default {
  data() {
    return {
      setForm: {
        name: '',
        intro: '',
        email: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入媒体名称', trigger: 'blur' },
          { min: 1, max: 7, message: '字符为1-7位', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '请输入您的介绍', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入您的邮箱', trigger: 'blur' },
          { pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '请输入正确的邮箱', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      option:{
        img: '',             //裁剪图片的地址
        outputSize: 1,       //裁剪生成图片的质量(可选0.1 - 1)
        outputType: 'png',  //裁剪生成图片的格式（jpeg || png || webp）
        info: true,          //图片大小信息
        canScale: true,      //图片是否允许滚轮缩放
        autoCrop: true,      //是否默认生成截图框
        autoCropWidth: 100,  //默认生成截图框宽度
        autoCropHeight: 100, //默认生成截图框高度
        fixed: true,         //是否开启截图框宽高固定比例
        fixedNumber: [1, 1], //截图框的宽高比例
        full: false,         //false按原比例裁切图片，不失真
        fixedBox: true,      //固定截图框大小，不允许改变
        canMove: false,      //上传图片是否可以移动
        canMoveBox: true,    //截图框能否拖动
        original: false,     //上传图片按照原始比例渲染
        centerBox: true,    //截图框是否被限制在图片里面
        height: true,        //是否按照设备的dpr 输出等比例图片
        infoTrue: false,     //true为展示真实输出图片宽高，false展示看到的截图框宽高
        maxImgSize: 3000,    //限制图片最大宽度和高度
        enlarge: 1,          //图片根据截图框输出比例倍数
        mode: '100%'  //图片默认渲染方式
      }
    }
  },
  components: {
    VueCropper
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          undateUserProfile(this.setForm).then(res => {
            this.setForm.name = res.data.data.name
            this.setForm.intro = res.data.data.intro
            this.setForm.email = res.data.data.email
            // 用过中央时间总线将得到的昵称传给layout组件
            bus.$emit('undate-user', this.setForm)
            this.$message({
              type: 'success',
              message: '资料更新成功'
            })
          })
        } else {
          console.log('error submit!!')
          return false;
        }
      })
    },
    loadUserMessage(){
      getUserProfile().then(res => {
        this.setForm = res.data.data
      })
    },
    fileChange(){
      let url = window.URL.createObjectURL(this.$refs.file.files[0]);
      this.option.img = url
      this.dialogVisible = true
      this.$refs.file.value = ''
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    imgLoad (msg) {
      console.log("工具初始化函数====="+msg)
    },
    uploadImg() {
      this.$refs.cropper.getCropBlob(file => {
        // console.log(file)
        let fs = new FormData()
        // 这里字段名称是photo
        fs.append('photo', file)
        // console.log(fs)
        setUserAvater(fs).then(res => {
          // console.log(res)
          this.setForm.photo = res.data.data.photo
          // 用过中央时间总线将得到的头像链接传给layout组件
          bus.$emit('undate-user', this.setForm)
          this.$message({
            type: 'success',
            message: '头像更新成功'
          })
        })
      })
    }
  },
  mounted(){
    this.loadUserMessage()
  }
}
</script>

<style>
.footer {
  display: flex;
}
.demo-ruleForm {
  width: 60%
}
.cropper {
  width:100%;
  height: 120px;
}
</style>
