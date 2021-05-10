<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
      </div>
      <el-table :data="articleList" style="width: 100%">
        <el-table-column prop="title" label="标题" width=""> </el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数" width="">
        </el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{
            scope.row.comment_status ? "正常" : "关闭"
          }}</template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeSwitch(scope.row)"
              :disabled="scope.row.disable"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <br />
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="comment.page"
        :page-sizes="pageSelect"
        :page-size.sync="comment.per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="articleTotal"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticle } from "@/api/article";
import { undateCommentStatus } from "@/api/comment";
export default {
  data() {
    return {
      articleList: [],
      pageSelect: [10, 20, 30, 40],
      comment: {
        per_page: 10,
        page: 1,
        response_type: "comment",
      },
      articleTotal: null,
    };
  },
  methods: {
    loadArticleList() {
      getArticle(this.comment).then((res) => {
        // console.log(res);
        var result = res.data.data;
        result.results.forEach((item) => {
          item.disable = false;
        });
        this.articleList = result.results;
        this.articleTotal = result.total_count;
      });
    },
    handleSizeChange() {
      this.comment.page = 1;
      this.loadArticleList();
      // console.log(this.comment);
      // console.log(this.pageSelect);
    },
    handleCurrentChange() {
      this.loadArticleList();
    },
    changeSwitch(data) {
      data.disable = true;
      undateCommentStatus(data.id.toString(), data.comment_status).then(
        (res) => {
          data.disable = false;
          this.$message({
            message: data.comment_status ? "开启成功" : "关闭成功",
            type: "success",
            duration: "1000",
          });
        }
      );
      // console.log(id);
    },
  },
  mounted() {
    this.loadArticleList();
    // console.log(this.articleList);
  },
};
</script>

<style>
</style>
