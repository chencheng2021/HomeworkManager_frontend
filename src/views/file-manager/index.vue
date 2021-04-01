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
                     icon="el-icon-refresh" @click="refresh_meta_data">重新加载</el-button>
          <el-button type="success" class="file-manager-header-btn" icon="el-icon-upload">
            上传文件
          </el-button>
        </div>
      </div>
    </div>
    <div style="height: auto">
      <file-table :table_render_data="file_table_render_data" :delete_btn_handler="handle_file_delete"></file-table>
      <div>
        <common-pagination></common-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {mock_file_data} from "@/utils/data_mock_util";
import {deeply_copy_obj} from "@/provider/common_provider";
import FileTable from "@/components/file-table";
import CommonPagination from "@/components/pagination";

export default {
  name: "file-manager",
  components: {CommonPagination, FileTable},
  data() {
    return {
      file_meta_data: mock_file_data(10),
      file_table_render_data: deeply_copy_obj(mock_file_data(10))
    }
  },
  methods: {
    handle_file_delete(file){
      console.log(file)
      // 将需要删除的数据过滤掉
      // 重新赋值并渲染数据
      this.file_meta_data = this.file_meta_data.filter(item => {
        return item.id !== file.id
      })
      this.file_table_render_data = deeply_copy_obj(this.file_meta_data)
      this.$message.success('已成功删除该文件')
    },
    refresh_meta_data(){
      this.file_meta_data = mock_file_data(10)
      this.file_table_render_data = this.file_meta_data
    }
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