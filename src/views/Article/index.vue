<template>
  <div class="article">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="text item">
        <el-form
          :model="article"
          :rules="rules"
          ref="article"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="标题" prop="title">
            <el-input v-model="article.title"></el-input>
          </el-form-item>
          <el-form-item label="封面" prop="cover">
            <el-radio-group v-model="article.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
            <div v-if="article.cover.type>0">
              <up-down-image v-for="item in article.cover.type"/>
            </div>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <!-- vue-quill-editor -->
            <!-- <quill-editor
              ref="myQuillEditor"
              v-model="article.content"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
              class="myQuillEditor"
            /> -->
            <el-tiptap
              v-model="article.content"
              :extensions="extensions"
              height="400"
              class="el_tiptap"
              placeholder="请输入内容"
            />
          </el-form-item>
          <el-form-item label="频道" prop="channel_id">
            <el-select v-model="article.channel_id" placeholder="请选择频道">
              <el-option
                v-for="channel in channels"
                :key="channel.id"
                :label="channel.name"
                :value="channel.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onPublish('article', false)"
              >发表</el-button
            >
            <el-button @click="onPublish('article', true)">存入草稿</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getChannel } from '@/api/channel'
import { addArticle, getOnlyArticle, updateArticle } from '@/api/article'
import { uploadImage } from '@/api/image'
import upDownImage from '@/components/upDownImage'
// vue-quill-editor
// import { quillEditor } from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
import 'element-tiptap/lib/index.css'
import {
  // necessary extensions
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoList,
  TodoItem,
  Preview,
  Fullscreen,
  Image
} from 'element-tiptap'
export default {
  data () {
    return {
      channels: [],
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          // 文章封面
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 封面图片的地址
        },
        channel_id: null
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          {
            min: 5,
            max: 30,
            message: '长度在 5 到 30 个字符',
            trigger: 'blur'
          }
        ],
        cover: [{ required: true, message: '请选择封面', trigger: 'change' }],
        channel_id: [
          { required: true, message: '请选择频道', trigger: 'change' }
        ],
        content: [{ required: true, message: '请填写内容' }]
      },
      // editorOption: {}
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // render command-button in bubble menu.
        new Underline({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new TodoList(),
        new TodoItem(),
        new Preview(),
        new Fullscreen(),
        new Image({
          // 默认会把上传的图片转为base64编码，字符串和图片编码放在一起，会同时加载，同时渲染，会导致请求的数据过长，导致加载变慢
          // 可以用uploadRequest方法将图片上传到素材库
          // 参数file是文件对象
          uploadRequest (file) {
            console.log(file)
            const fs = new FormData()
            fs.append('image', file)
            // console.log(fs)
            return uploadImage(fs).then(res => {
              return res.data.data.url
            })
          }
        })
      ],
      id: null
    }
  },
  components: {
    // quillEditor
    'el-tiptap': ElementTiptap,
    upDownImage
  },
  methods: {
    onPublish (formName, draft) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$route.query.id) {
            updateArticle(this.$route.query.id, this.article, draft).then(
              (res) => {
                // console.log(res)
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
              }
            )
          } else {
            addArticle(this.article, draft).then((res) => {
              // 处理响应结果
              this.$message({
                message: draft ? '草稿成功' : '发布成功',
                type: 'success'
              })
            })
            // console.log(this.article.content)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    loaderChannel () {
      getChannel().then((res) => {
        this.channels = res.data.data.channels
      })
    },
    loaderArticle () {
      this.id = this.$route.query.id
      console.log(this.id)
      if (this.id) {
        getOnlyArticle(this.id).then((res) => {
          const data = res.data.data
          this.article = {
            title: data.title,
            content: data.content,
            cover: data.cover,
            channel_id: data.channel_id
          }
        })
      }
      this.id = null
    }
    // 富文本编辑器方法
    // getInputValue (value) {
    //   this.article.content = value
    // },
    // onEditorBlur (quill) {
    // },
    // onEditorFocus (quill) {
    // },
    // onEditorReady (quill) {
    // },
    // onEditorChange ({ quill, html, text }) {
    //   this.fatherContent = html
    // }
  },
  mounted () {
    this.loaderChannel()
    this.loaderArticle()
  },
  computed: {
    // vue-quill-editor
    // editor () {
    //   return this.$refs.myQuillEditor.quill
    // }
  },
  watch: {
    article: {
      handler (newValue) {
        if (newValue.content === '<p></p>') {
          this.article.content = ''
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="css">
  .el_tiptap {
    z-index: 999
  }
</style>
