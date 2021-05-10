<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="全部" :value="null"></el-option>
            <el-option
              v-for="data in ChannelList"
              :label="data.name"
              :value="data.id"
              :key="data.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 日期筛选 -->
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.value1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="loading"
            >筛选</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <!-- loading用于获取数据时出现动画效果，可以更好的去交互 -->
    <el-card class="box-card card2" v-loading="loading">
      <div slot="header" class="clearfix">
        <div>共找到{{ total_count }}条数据</div>
        <!-- 数据表 -->
        <el-table :data="articles" style="width: 100%">
          <el-table-column label="封面">
            <!-- slot-scope="scope"这句代码必须要有，scope.row可以获取到每个遍历的对象 -->
            <template slot-scope="scope">
              <!-- <img :src="scope.row.cover.images[0]"
              class="coverImg"
              v-if="scope.row.cover.images[0]">
              <img src="./imgs/default.png"
              v-else
              class="coverImg"> -->
              <el-image :src="scope.row.cover.images[0]" class="coverImg" lazy>
                <div slot="placeholder" class="image-slot">
                  加载中
                  <span class="dot">...</span>
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column label="状态">
            <!-- 自定义如果需要拿到对应的数据scope， -->
            <template slot-scope="scope">
              <el-tag :type="statu[scope.row.status].type">
                {{ statu[scope.row.status].tag }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="pubdate" label="发布时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                size="mini"
                @click="$router.push('/article?id='+scope.row.id)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                size="mini"
                @click="onDeleteArticle(scope.row.id.toString())"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 数据筛选表单 -->
      <!-- 默认每页显示10条数据 -->
      <el-pagination
        background
        page_size="per_page"
        layout="prev, pager, next"
        :total="total_count"
        class="page"
        :current-page.sync="currentPage"
        @current-change="changePage"
        :disabled="loading"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticle, deleteArticle } from '@/api/article'
import { getChannel } from '@/api/channel'
export default {
  data () {
    return {
      form: {
        region: null,
        resource: this.status,
        value1: ''
      },
      articles: [],
      total_count: 0,
      statu: [
        { status: '0', type: 'info', tag: '草稿' },
        { status: '1', type: '', tag: '待审核' },
        { status: '2', type: 'success', tag: '审核通过' },
        { status: '3', type: 'warning', tag: '审核失败' },
        { status: '4', type: 'danger', tag: '已删除' }
      ],
      currentPage: 1, // 当前页
      per_page: 10, // 每页显示数据的条数
      status: null, // 查询文章的状态
      ChannelList: [], // 频道列表
      loading: true
    }
  },
  methods: {
    onSubmit () {
      this.getArticle(this.currentPage)
      // console.log(this.form.region)
      // this.begin_pubdate = this.form.value1[0].toLocaleDateString().replace(/\//g, '-')
      // this.end_pubdate = this.form.value1[1].toLocaleDateString().replace(/\//g, '-')
    },
    // 获取文章列表的方法
    getArticle (page) {
      this.loading = true
      getArticle({
        page,
        per_page: this.per_page,
        status: this.status,
        channel_id: this.form.region,
        begin_pubdate: this.form.value1 ? this.form.value1[0] : null,
        end_pubdate: this.form.value1 ? this.form.value1[1] : null
      }).then((res) => {
        this.articles = res.data.data.results
        this.total_count = res.data.data.total_count
        // 数据请求结束后关闭加载
        this.loading = false
        // console.log(res)
      })
    },
    changePage () {
      this.getArticle(this.currentPage)
    },
    // 获取频道的列表
    getChannelList () {
      getChannel().then((res) => {
        this.ChannelList = res.data.data.channels
      })
    },
    onDeleteArticle (id) {
      // console.log(id)
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteArticle(id)
            .then((res) => {
              // console.log(res)
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getArticle(this.currentPage)
            })
            .catch((err) => {
              this.$message.error('删除失败')
              console.log(err)
            })
        })
        .catch(() => {})
    }
  },
  mounted () {
    this.getChannelList()
    this.getArticle(this.currentPage)
  }
}
</script>

<style>
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
.page {
  text-align: right;
}
.card2 {
  margin-top: 20px;
}
.coverImg {
  height: 100px;
  width: 100px;
}
</style>
