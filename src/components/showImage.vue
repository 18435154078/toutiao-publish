<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="25%"
      :before-close="handleClose"
    >
      <!-- 需要设置请求头 -->
      <el-upload
        class="avatar-uploader"
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        :show-file-list="false"
        :headers="{ Authorization: 'Bearer ' + token }"
        :on-success="handleAvatarSuccess"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
    <div>
    <el-button
        style="float: right; padding: 10px"
        type="success"
        @click="dialogVisible = true"
        v-if="showAddImage"
        >添加素材</el-button>
    <!-- tab标签 -->
    <el-radio-group
        v-model="collect"
        style="margin-bottom: 30px"
        @change="loadImageList(collect)"
    >
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button label="true">收藏</el-radio-button>
    </el-radio-group>
    <!-- 素材列表 栅格布局 -->
    <el-row :gutter="40" class="item">
        <el-col
        v-for="image in imageList"
        :key="image.id"
        :xs="12"
        :sm="6"
        :md="6"
        :lg="6"
        :xl="6"
        class="col"
        >
        <el-image
          style="width: 150px; height: 150px"
          :src="image.url"
          @click="selectImage(image)"
        >
        </el-image>
        <img src="@/assets/selected.png" class="selected" v-if="image.isSelected"/>
        <!-- 图片编辑 -->
        <div class="edit" v-if="showFoot">
            <el-button
            :icon="
                image.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'
            "
            circle
            type="primary"
            size="mini"
            :loading="image.loading_collect"
            @click="is_collect(image)"
            ></el-button>
            <el-button
            icon="el-icon-delete"
            circle
            type="danger"
            size="mini"
            :loading="image.loading_delete"
            @click="deleteImg(image)"
            ></el-button>
        </div>
        </el-col>
    </el-row>
    <!-- 分页 -->
    <el-pagination
        background
        layout="prev, pager, next"
        :total="totalPage"
        :page-size="20"
        class="pagination"
        :current-page.sync="page"
        @current-change="changePage"
    ></el-pagination>
    </div>
  </div>
</template>
<script>
import { getImageList, deleteImage, celectImage } from "@/api/image.js"
export default {
  name: 'showImage',
  data() {
    return {
      collect: false,
      imageList: [],
      page: 1,
      totalPage: 1,
      per_page: 20,
      dialogVisible: false,
      token: JSON.parse(window.localStorage.getItem("user")).token,
      imageUrl: ""
    }
  },
  props: {
    showAddImage: {
      type: Boolean
    },
    showFoot: {
      type: Boolean
    }
  },
  methods: {
    loadImageList(collect) {
      getImageList({
        collect,
        page: this.page,
        per_page: this.per_page
      }).then((res) => {
        // 将image中添加一个loading属性
        const result = res.data.data;
        result.results.forEach((item) => {
          item.loading_collect = false
          item.loading_delete = false
          item.isSelected = false
        });
        // console.log(res)
        this.imageList = result.results;
        this.totalPage = result.total_count;
      })
    },
    changePage() {
      this.loadImageList(this.collect);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done()
        })
        .catch((_) => {});
    },
    handleAvatarSuccess() {
      this.dialogVisible = false
      this.loadImageList(this.collect)
    },
    deleteImg(image) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        image.loading_delete = true;
        deleteImage(image.id).then((res) => {
          image.loading_delete = false
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.loadImageList(this.collect);
        })
      })
    },
    is_collect(image) {
      // 通过添加的loading属性控制收藏按钮的禁用效果
      image.loading_collect = true;
      celectImage(image.id, !image.is_collected).then((res) => {
        image.loading_collect = false
        image.is_collected = !image.is_collected
        if (this.collect) {
          this.loadImageList(this.collect)
        }
      })
    },
    selectImage(value) {
      if(!this.showAddImage) {
        this.imageList.forEach(item => {
          item.isSelected = false
        })
        value.isSelected = true
        this.$emit('sendImage', value.url)
      }
    },
    deleteDuigou(){
      this.imageList.forEach(item => {
        item.isSelected = false
      })
    }
  },
  created() {
    this.loadImageList(this.collect);
  }
  // watch: {
  //   collect: function (newValue) {
  //     this.loadImageList(newValue);
  //   },
  // },
}
</script>

<style>
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.edit {
  width: 150px;
  height: 50px;
  background: rgba(244, 244, 244, 0.8);
  position: relative;
  bottom: 54px;
  left: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 30px;
}
.col {
  position: relative;
}
.selected {
  position: absolute;
  top: 0;
  left: 20px;
  width: 150px;
  height: 150px;
}
</style>
