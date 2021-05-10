<template>
  <div>
      <el-upload
        action="http://localhost:8000/unload/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <button @click="handleclick">click</button>
      <a href="" id="a"></a>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'layout',
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleclick () {
      $.ajax({
        url: 'http://localhost:8000/download/',
        success: function (data) {
          var a = document.getElementById('a')
          // var file = new Blob([data], {type: 'application/x-zip-compressed'})
          a.href = data
          a.click()
        }
      })
    }
  }
}
</script>

<style>

</style>
