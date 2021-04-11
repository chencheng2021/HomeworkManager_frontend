<template>
  <div style="width:100%;height:auto">
    <el-table ref="file_table" :data="table_render_data" stripe
              @selection-change="selection_change_handler"
              width="500" v-if="selection_mode">
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column property="name" label="文件名称"></el-table-column>
      <el-table-column property="type" label="文件类型"></el-table-column>
      <el-table-column property="publishState" label="发布状态">
        <template slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.publish_state === 0"> 未发布 </el-tag>
          <el-tag type="success" v-else> 已发布 </el-tag>
        </template>
      </el-table-column>
      <el-table-column property="upload_date" label="上传时间" sortable></el-table-column>
    </el-table>

    <el-table ref="file_table" :data="table_render_data" stripe v-else>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column property="name" label="文件名称"></el-table-column>
      <el-table-column property="type" label="文件类型"></el-table-column>
      <el-table-column property="publishState" label="发布状态">
        <template slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.publishState === 0"> 未发布 </el-tag>
          <el-tag type="success" v-else> 已发布 </el-tag>
        </template>
      </el-table-column>
      <el-table-column property="uploadDate" label="上传时间" sortable></el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-download"
                     @click="jump_out(scope.row.url)" style="margin-right: 8px">
            打开链接
          </el-button>
          <el-button type="text" icon="el-icon-edit" @click="handle_edit_dialog_open(scope.row)"
                     style="margin-right: 10px">修改名称</el-button>
          <el-popconfirm confirm-button-text="确认"
                         cancel-button-text="取消"
                         title="确认删除该文件吗？"
                         @confirm="delete_btn_handler(scope.row)"
                         icon="el-icon-info" icon-color="red">
            <el-button type="text" icon="el-icon-delete" class="file-del-btn" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="edit_dialog_open_flag" width="500px" center title="修改文件名称">
      <div style="display: flex;height: 60px">
        <label style="width: 80px;line-height: 60px">文件名称: </label>
        <el-input v-model="filename" placeholder="请输入文件名称" style="line-height: 60px"></el-input>
      </div>
      <div style="text-align: center;margin-top: 30px">
        <el-button type="primary" round @click="update_file_name" style="width: 120px;">确认修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {update_file_name} from "@/api/file_service";
import {link_jumping} from "@/provider/common_provider";

export default {
  name: "file-table",
  props: {
    table_render_data: {
      type: Array,
      default: () => {
        return []
      }
    },
    selection_mode: {
      type: Boolean,
      default: false
    },
    use_index: {
      type: Boolean,
      default: true
    },
    enable_operate: {
      type: Boolean,
      default: true
    },
    selection_change_handler: {
      type: Function,
      default: () => {}
    },
    delete_btn_handler: {
      type: Function,
      default: () => {}
    },
  },
  data() {
    return {
      filename: '',
      edit_dialog_open_flag: false,
      curr_edit_file: null
    }
  },
  methods: {
    clear_selection() {
      this.$refs.file_table.cleanSelection()
    },
    handle_edit_dialog_open(file_item){
      // 保存当前正在编辑的文件数据
      this.curr_edit_file = file_item
      this.filename = file_item.name
      this.edit_dialog_open_flag = true
    },
    handle_edit_dialog_close(){
      this.edit_dialog_open_flag = false
    },
    update_file_name(){
      if (this.filename !== ''){
        this.$fsloading.startLoading('正在提价更改...')
        update_file_name(this.curr_edit_file.id,this.filename).then(() => {
          this.$fsloading.endLoading()
          this.curr_edit_file.name = this.filename
          this.handle_edit_dialog_close()
          this.$message.success('文件名称修改成功')
        }).catch(() => {
          this.$fsloading.endLoading()
        })
      }else{
        this.$message.warning('请输入文件名')
      }

    },
    jump_out(link){
      link_jumping(link)
    }
  }
}
</script>

<style scoped>

.file-del-btn{
  color: #F56C6C;
}
.file-del-btn:hover{
  color: #ff0000;
}

/*使表头标题居中*/
/deep/.el-table th{
  text-align: center;
}

/*使表格内容居中*/
/deep/.el-table td{
  text-align: center;
}

</style>