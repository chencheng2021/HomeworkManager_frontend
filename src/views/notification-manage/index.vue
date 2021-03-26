<template>
  <div style="width: 100%;height: auto;display: block;" >
    <div style="width: 100%;height: 100px;margin-bottom: 20px;display: flex;background: #ffffff">

    </div>
    <div style="width: 100%;height: 50px;margin-bottom: 20px;display: flex;background: #ffffff">

    </div>
    <div>
      <el-table :data="notification_meta_data" stripe  >
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column property="title" label="通知标题" width="200"></el-table-column>
        <el-table-column property="content" label="通知内容" width="500"></el-table-column>
        <el-table-column property="type" label="通知类型" width="120">
          <template slot-scope="scope" >
            <el-tag type="info" v-if="scope.row.type === 0">文本通知</el-tag>
            <el-tag type="primary" v-if="scope.row.type === 1">附件通知</el-tag>
            <el-tag type="warning" v-if="scope.row.type === 2">短信通知</el-tag>
          </template>
        </el-table-column>
        <el-table-column property="confirmable" label="可确认标识" width="120">
          <template slot-scope="scope" >
            <el-tag type="danger" v-if="scope.row.confirmable">需要确认</el-tag>
            <el-tag type="primary" v-else>不需确认</el-tag>
          </template>
        </el-table-column>
        <el-table-column property="total_confirm" label="已确认数据" width="100"></el-table-column>
        <el-table-column property="create_date" label="发布日期" sortable></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <el-button type="text">
                通知操作<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="scope.row.type === 1">
                  <el-button type="text" @click="handle_attachment_dialog_open(scope.row)">附件信息</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" @click="handle_members_dialog_open(scope.row.id)">通知成员</el-button>
                </el-dropdown-item>
                <el-dropdown-item v-if="scope.row.type !== 2">
                  <el-button type="text" @click="handle_sms_remind(scope.row)">短信提醒</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <common-pagination></common-pagination>
    </div>
    <el-dialog title="附件信息" :visible.sync="attachment_dialog_open_flag" width="500px" :before-close="handle_attachment_dialog_close" center>
      <file-card :file_data_list="curr_attachment_data"></file-card>
    </el-dialog>
    <el-dialog title="通知成员信息" :visible.sync="notification_member_dialog_open_flag" :before-close="handle_members_dialog_close">
      <el-table :data="curr_members_info" height="500"
                v-loading="table_loading"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                element-loading-text="数据加载中">
        <el-table-column property="member_type" label="成员身份"></el-table-column>
        <el-table-column property="student_no" label="学号"></el-table-column>
        <el-table-column property="member_name" label="姓名" ></el-table-column>
        <el-table-column property="member_gender" label="性别" width="100px"></el-table-column>
        <el-table-column property="member_class" label="班级"></el-table-column>
        <el-table-column property="member_contact" label="联系方式"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {mock_notification_data, mock_nt_members_info} from "@/utils/data_mock_util";
import FileCard from "@/components/file-card";
import CommonPagination from "@/components/pagination";

export default {
  name: "notification-manage",
  components: {CommonPagination, FileCard},
  data(){
    return {
      notification_meta_data: mock_notification_data(),
      attachment_dialog_open_flag: false,
      notification_member_dialog_open_flag: false,
      // 当前附件信息的数据集
      curr_attachment_data: [],
      // 当前通知成员的数据集
      curr_members_info: [],
      table_loading: true,
    }
  },
  methods: {
    handle_attachment_dialog_open(item){
      this.attachment_dialog_open_flag = true
      this.curr_attachment_data = item.attachment
    },
    handle_attachment_dialog_close(){
      this.curr_attachment_data = []
      this.attachment_dialog_open_flag = false
    },
    handle_members_dialog_open(id){
      console.log(id)
      setTimeout(() => {
        this.table_loading = false
        this.curr_members_info = mock_nt_members_info()
        //TODO  数据加载完毕后将其放到store缓存中，因为已发布的通知这一信息是固定不变的
      },1000)
      this.notification_member_dialog_open_flag = true
    },
    handle_members_dialog_close(){
      this.curr_members_info = []
      this.notification_member_dialog_open_flag = false
      this.table_loading = true
    },
    handle_sms_remind(item){
      console.log(item)
      this.$msgbox({
        title: '提示',
        message: '此操作将会向所有通知成员发送手机短信进行提醒，是否继续？',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        showCancelButton: true,
        beforeClose:((action, instance, done) => {
          if (action === 'confirm'){
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '短信发送中...'
            setTimeout(() => {
              done()
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            },1000)
          }else {
            done()
          }
        })
      }).then( () => {
        this.$message.success('已成功向通知成员发送提醒短信')
      })
    }
  }
}
</script>

<style scoped>

/*使表头标题居中*/
/deep/.el-table th{
  text-align: center;
}

/*使表格内容居中*/
/deep/.el-table td{
  text-align: center;
}

</style>