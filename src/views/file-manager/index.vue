<template>
  <div>
    <div style="width: 100%;height: 100px;margin-bottom: 20px;display: flex;background: #ffffff">
      <div style="width: 20%;margin-left: 20px;text-align: center; ">
        <div style="height: 60px;line-height: 60px;font-size: 20px;font-weight: bold">文件总数</div>
        <div class="file-manager-header-desc">{{file_meta_data.length}}</div>
      </div>
      <div style="width: 80%;line-height: 100px">
        <div style="float: right">
          <el-button type="primary" class="file-manager-header-btn"
                     icon="el-icon-refresh" @click="load_page_data">重新加载</el-button>
          <el-button type="success" class="file-manager-header-btn"
                     @click="handle_upload_dialog_open"
                     icon="el-icon-upload">
            上传文件
          </el-button>
        </div>
      </div>
    </div>
    <div style="height: auto">
      <file-table :table_render_data="file_table_render_data" :delete_btn_handler="handle_file_delete"></file-table>
      <div>
        <common-pagination ref="file_page" @load-page="refresh_page"></common-pagination>
      </div>
    </div>
    <el-dialog :visible.sync="upload_dialog_open_flag" center title="文件上传" width="500px">
      <div style="width: 100%;height: 100px">
        <file-upload-btn @upload-success="handle_upload_dialog_close"></file-upload-btn>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {deeply_copy_obj, process_file_type} from "@/provider/common_provider";
import FileTable from "@/components/file-table";
import CommonPagination from "@/components/pagination";
import FileUploadBtn from "@/components/file-upload-btn";
import {delete_file, get_file_page, save_file} from "@/api/file_service";

export default {
  name: "file-manager",
  components: {FileUploadBtn, CommonPagination, FileTable},

  created() {
    this.$fsloading.initLoading()
    this.load_page_data()
  },

  data() {
    return {

      loaded_page:{
        page_size: 10,
        page_num: 1,
        total: 0,
      },

      file_meta_data: [],
      file_table_render_data: [],
      upload_dialog_open_flag: false
    }
  },
  methods: {

    refresh_page(page_size,page_num){
      this.$fsloading.startLoading('loading....')
      this.loaded_page.page_size = page_size
      this.loaded_page.page_num = page_num
      this.load_page_data()
    },

    load_page_data(){
      // 加载分页数据
      get_file_page(this.loaded_page.page_size,this.loaded_page.page_num).then((data) => {
        this.file_meta_data = data.all_data !== null ? data.all_data : []
        process_file_type(this.file_meta_data)
        // 分页数据
        this.file_table_render_data = data.pagination_data
        process_file_type(this.file_table_render_data)
        this.file_table_render_data.forEach(item => {
          const date_time = Number(item.uploadDate)
          item.uploadDate = this.process_time(date_time)
        })
        this.loaded_page.total = data.total
        this.$refs.file_page.init_total(data.total)
        this.$fsloading.endLoading()
      }).catch(() => {
        this.$fsloading.endLoading()
      })
    },

    process_time(timeMillions){
      let date = new Date(timeMillions)
      let hh =date.getHours() < 10? "0" + date.getHours(): date.getHours();
      let mm =date.getMinutes() < 10? "0" + date.getMinutes(): date.getMinutes();
      let ss =date.getSeconds() < 10? "0" + date.getSeconds(): date.getSeconds();
      this.now_hour = hh
      this.now_min = mm
      this.now_sec =ss
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      return year + '-' + month + '-' + day + ' ' + hh + ':' + mm
    },

    handle_file_delete(file){
      this.$fsloading.startLoading('正在提交删除...')
      delete_file(file.id).then(() => {
        this.$fsloading.endLoading()
        // 将需要删除的数据过滤掉
        // 重新赋值并渲染数据
        this.file_meta_data = this.file_meta_data.filter(item => {
          return item.id !== file.id
        })
        this.file_table_render_data = deeply_copy_obj(this.file_meta_data)
        this.$message.success('已成功删除该文件')
      }).catch(() => {
        this.$fsloading.endLoading()
      })
    },
    handle_upload_dialog_open(){
      this.upload_dialog_open_flag = true
    },
    handle_upload_dialog_close(filename,url){
      let file = {
        name: filename,
        url: url,
      }
      this.$fsloading.startLoading('正在保存文件记录...')
      save_file(file).then(() => {
        this.$fsloading.endLoading()
        this.upload_dialog_open_flag = false
        this.$message.success('已成功保存文件记录')
        this.load_page_data()
      }).catch(()=>{
        this.$fsloading.endLoading()
      })
    },

  }
}
</script>

<style scoped>

.file-manager-header-desc{
  height: 40px;line-height: 20px;font-size: 20px
}

.file-manager-header-btn{
  width: 140px;margin-right: 40px;height: 50px
}

</style>