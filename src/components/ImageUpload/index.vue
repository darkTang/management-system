<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :limit="1"
      :file-list="fileList"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :http-request="upload"
      :class="{disabled: fileComputed}"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!-- 进度条组件 -->
    <el-progress v-if="showPercent" style="width: 180px" :percentage="percent" />
    <!-- 预览 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5' // 引入腾讯云cos包
var cos = new COS({
  SecretId: 'AKIDGTTEn7IKLH6yfDakfQzJPG5qZDzc1C8q',
  SecretKey: 'XptiJgroX1KQHuIRL0RdbKo46tSmrhIf',
})
export default {
  name: 'ImageUpload',
  data() {
    return {
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: '',
      currentFileUid: null,
      percent: 0,
      showPercent: false,
    }
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1
    },
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    changeFile(file, fileList) {
      this.fileList = fileList
    },
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.some(item => item === file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      this.currentFileUid = file.uid
      this.showPercent = true
      return true // 最后一定要return true
    },
    upload(params) {
      if (params.file) {
        // 执行上传操作
        cos.putObject(
          {
            Bucket: 'rqm-1310837901', // 存储桶
            Region: 'ap-guangzhou', // 地域
            Key: `/back-mana-sys/${params.file.name}`, // 文件名
            Body: params.file, // 要上传的文件对象
            StorageClass: 'STANDARD', // 上传的模式类型 直接默认 标准模式即可
            // 上传到腾讯云 =》 哪个存储桶 哪个地域的存储桶 文件  格式  名称 回调
            onProgress: params => {
              this.percent = params.percent * 100
            },
          },
          (err, data) => {
            // data返回数据之后 应该如何处理
            if (!err && data.statusCode === 200) {
              // 上传成功
              this.fileList = this.fileList.map(item => {
                if (item.uid === this.currentFileUid) {
                  return { url: 'http://' + data.Location, upload: true }
                  // upload 为true 表示这张图片已经上传完毕 这个属性要为我们后期应用的时候做标记
                  // 保存  => 图片有大有小 => 上传速度有快又慢 =>要根据有没有upload这个标记来决定是否去保存
                }
                return item
              })
              setTimeout(() => {
                this.showPercent = false
                this.percent = 0
              }, 1000)
            }
          }
        )
      }
    },
  },
}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>
