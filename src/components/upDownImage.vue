<template>
    <div>
        <div class="updownimage" @click="undownImage">
            <img src="" ref="updownimage" class="updownImage"/>
        </div>
        <el-dialog
            title="提示"
            :visible="dialogVisible"
            width="70%"
            :before-close="handleClose">
            <template>
                <el-tabs v-model="activeName">
                    <el-tab-pane label="素材库" name="first">
                        <show-image
                            :showAddImage="false"
                            :showFoot="false"
                            @sendImage="sendImages($event)"
                            ref="show-image"
                        />
                    </el-tab-pane>
                    <el-tab-pane label="上传图片" name="second">
                        <input type="file" class="file" ref="file" @change="handleChange"/>
                        <div class="upDown" @click="upDown" v-show="isupDown">+</div>
                        <img src="" ref="showImage" class="showImage" v-show="showImage"/>
                    </el-tab-pane>
                </el-tabs>
            </template>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { uploadImage } from '@/api/image'
import showImage from '@/components/showImage'
import bus from '@/utils/global-bus'
export default {
    name: 'updownimage',
    data() {
        return {
            dialogVisible: false,
            activeName: 'first',
            isupDown: true,
            showImage: false,
            sendImage: ''
        }
    },
    props:{
        url: {
            type: String
        }
    },
    components: {
        showImage
    },
    mounted() {
        this.$refs.updownimage.src = this.url ? this.url : ''
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                this.dialogVisible = false
            })
            .catch(_ => {})
        },
        undownImage() {
            this.dialogVisible = true
        },
        upDown() {
            this.$refs.file.click()
        },
        confirm() {
            if(this.activeName === 'second'){
                let file = this.$refs.file.files[0]
                let fs = new FormData()
                fs.append('image', file)
                uploadImage(fs).then(res => {
                    this.$refs.updownimage.src = res.data.data.url
                    this.dialogVisible = false
                    this.isupDown = true
                    this.showImage = false
                    this.$refs.file.value = null
                    this.$emit('getCoverUrl', res.data.data.url)
                })
            }else{
                if(this.sendImage){
                    this.$emit('getCoverUrl', this.sendImage)
                    this.dialogVisible = false
                    this.$refs['show-image'].deleteDuigou()
                } else {
                    this.$message('请选择图片')
                }
            }
        },
        handleChange() {
            this.isupDown = false
            this.showImage = true
            let file = this.$refs.file.files[0]
            let blob = window.URL.createObjectURL(file)
            this.$refs.showImage.src = blob
        },
        sendImages(value) {
            this.$refs.updownimage.src = value
            this.sendImage = value
        }
    }
}
</script>

<style lang="css" scoped>
.updownimage {
    width: 150px;
    height: 120px;
    border: 1px solid #ccc;
    float: left;
    margin-right: 10px;
    overflow: hidden;
}
.updownImage {
    width: 100%;
}
.file {
    display: none;
}
.upDown {
    width: 150px;
    height: 150px;
    border: 1px dashed #ccc;
    font-size: 36px;
    text-align: center;
    line-height: 150px;
    border-radius: 5px;
    margin: 0 auto;
}
.showImage {
    width: 150px;
    height: 150px;
    border: 1px dashed #ccc;
    display: block;
    border-radius: 5px;
    margin: 0 auto;
}
</style>