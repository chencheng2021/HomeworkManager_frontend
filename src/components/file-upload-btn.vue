<template>
  <div style="height: auto;width: 100%;text-align: center">
    <!--  文件上传每次只允许上传一个文件，支持全部类型的文件上传-->
    <el-upload :action="upload_action" :on-exceed="() => {this.$message.warning('单次只能上传一个文件')}"
               ref="upload"
               :on-change="handle_change"
               :on-remove="handle_remove" :file-list="file_list_upload"
               :on-success="handle_upload_success"
               :on-error="handle_upload_fail"
               :auto-upload="false"
               :limit="1" name="file"
               accept="">
      <el-button slot="trigger" type="primary"  round style="margin-right: 20px">选择文件</el-button>
      <el-button  round @click="handle_file_upload">上传到服务器</el-button>
    </el-upload>
  </div>
</template>

<script>
import {get_file_upload_url} from "@/provider/common_provider";

export default {
  name: "file-upload-btn",
  props: {},
  data() {
    return {
      file_list_upload: [],
      // 文件上传的服务接口
      upload_action: get_file_upload_url(),
      // 是否已经有选中了需要上传的文件
      selected: false,
    }
  },
  methods: {
    handle_file_upload(){
      if (this.selected){
        // 提交上传
        this.$refs.upload.submit()
      }else{
        this.$message.warning('请选择要上传的文件！')
      }
    },
    handle_change(){
      this.selected = !this.selected
    },
    handle_remove(){
      this.selected = false
    },
    handle_upload_success(response){
      this.$message.success('已成功上传所选文件')
      // 通知父组件，让父组件做出相应操作
      // 这里的response就是服务端返回的文件的id
      // element-ui会将返回的数据取出然后再回调方法
      this.$emit('upload-success',response)
      // 清空已选文件缓存
      this.file_list_upload = []
      this.selected = false
    },
    handle_upload_fail(){
      this.selected = false
      this.$message.error('文件上传失败，请重试！')
    }
  }

}
</script>

<style scoped>

</style>