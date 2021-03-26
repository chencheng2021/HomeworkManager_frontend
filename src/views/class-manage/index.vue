<template>
  <div>
    <div class="class-manage_content-header">
      <div class="class-manage_content-box">
        <div class="class-manage_content-val">
          <label style="font-size: 16px">班级总数</label>
        </div>
        <div class="class-manage_content-val">
          <label style="font-size: 28px">12</label>
        </div>
      </div>
      <div class="class-manage_content-box">
        <div style="float: right;height: 100px;line-height: 100px;text-align: center;align-items: center">
          <el-button icon="el-icon-circle-plus-outline"
                     @click="create_class" type="primary"
                     style="width: 140px;height: 50px;margin-right: 50px">创建班级</el-button>
        </div>
      </div>
    </div>
    <class-info-item
        :class_info_data="class_meta_data"
        :class_files_list_handler="handle_class_file_list"
        :members_import_btn_handler="handle_members_import"
        :contact_btn_handler="handle_members_info"
        :dismiss_btn_handler="handler_class_delete"
        :edit_btn_handler="handle_class_info_edit">
    </class-info-item>
    <el-drawer title="创建班级" size="500px"
               @close="clear_form"
               :visible.sync="drawer_open_flag"
               :close-on-press-escape="false"
               :wrapper-closable="false">
      <el-divider></el-divider>
      <div class="class-manage_drawer-body">
        <class-edit-drawer
            ref="class_edit_drawer"
            :form_submit_handler="handle_form_submit"
            @cancel-submit="close_drawer"></class-edit-drawer>
      </div>
    </el-drawer>
    <el-dialog :title="dialog_title" :visible.sync="info_dialog_open_flag" width="800px" center
               :before-close="() => {this.checkout_to_student_info();this.info_dialog_open_flag = false}">
      <el-table :data="class_members_data" height="500" v-if="show_student_info">
        <el-table-column property="student_no" label="学号"></el-table-column>
        <el-table-column property="name" label="姓名" ></el-table-column>
        <el-table-column property="gender" label="性别" width="100px"></el-table-column>
        <el-table-column property="contact" label="联系方式"></el-table-column>
        <el-table-column property="email" label="邮箱"></el-table-column>
        <el-table-column property="social_account" label="QQ号"></el-table-column>
      </el-table>
      <el-table :data="student_parent_info" height="500" v-else>
        <el-table-column property="student_name" label="学生姓名"></el-table-column>
        <el-table-column property="name" label="家长姓名" ></el-table-column>
        <el-table-column property="relation" label="关系" width="100px"></el-table-column>
        <el-table-column property="contact" label="联系方式"></el-table-column>
      </el-table>
      <div style="margin-top: 20px;width: 100%;text-align: center;display: flex;justify-content: center">
        <el-button plain @click="checkout_to_parent_info">查看学生家长信息</el-button>
        <el-button plain @click="checkout_to_student_info">查看学生信息</el-button>
      </div>
    </el-dialog>
    <el-dialog title="导入学生信息" :visible.sync="import_dialog_open_flag" width="800px" center
               :before-close="handle_import_dialog_close"
               :close-on-click-modal="false">
      <el-table :data="student_import_data" height="500">
        <el-table-column property="student_no" label="学号"></el-table-column>
        <el-table-column property="name" label="姓名" ></el-table-column>
        <el-table-column property="gender" label="性别" width="100px"></el-table-column>
        <el-table-column property="contact" label="联系方式"></el-table-column>
        <el-table-column property="email" label="邮箱"></el-table-column>
        <el-table-column property="social_account" label="QQ号"></el-table-column>
      </el-table>
      <div style="margin-top: 20px;width: 100%;text-align: center;display: flex;justify-content: center">
        <el-upload action="" :on-exceed="() => {this.$message.warning('单次只能上传一个文件')}"
                   :on-change="handle_change_when_importing"
                   :on-remove="handle_remove_when_importing" :file-list="file_list_upload"
                   :auto-upload="false"
                   :limit="1"
                   accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel">
          <el-button slot="trigger" type="primary"  round style="margin-right: 20px">选择文件</el-button>
          <el-popconfirm title="确定将以上学生都注册到班级中吗？" @confirm="handle_confirm_student_import">
            <el-button type="success" round slot="reference">确认导入</el-button>
          </el-popconfirm>
        </el-upload>
      </div>
    </el-dialog>
    <el-dialog title="班级文件" :visible.sync="class_files_dialog_open_flag" width="500px" center>
      <file-card :file_data_list="attachment_data"></file-card>
    </el-dialog>
  </div>
</template>

<script>
import ClassInfoItem from "@/components/class-info-item";
import ClassEditDrawer from "@/components/class-edit-drawer";
import {
  mock_attachment_data,
  mock_class_info_data,
  mock_parent_contact_data,
  mock_student_contact_data
} from "@/utils/data_mock_util";
import {import_file} from "@/vendor/file_json_reader";
import FileCard from "@/components/file-card";
export default {
  name: "class-manage",
  components: {FileCard, ClassEditDrawer, ClassInfoItem},
  data(){
    return{
      class_meta_data: mock_class_info_data(),
      class_members_data:mock_student_contact_data(),
      student_parent_info: mock_parent_contact_data(mock_student_contact_data()),
      attachment_data: mock_attachment_data(),
      dialog_title: '班级学生信息',
      show_student_info: true,
      drawer_open_flag: false,
      info_dialog_open_flag: false,
      import_dialog_open_flag: false,
      student_import_data: [],
      file_temp: null,
      file_list_upload:[],
      class_files_dialog_open_flag: false
    }
  },
  methods:{
    handle_class_info_edit(origin){
      this.drawer_open_flag = true
      // 传递数据给子组件进行修改
      setTimeout(() => {
        // 这里必须要进行超时调用，因为需要子组件先实例化
        this.$refs.class_edit_drawer.on_edit_call(origin)
      },10)
    },
    create_class(){
      this.drawer_open_flag = true
    },
    handle_form_submit(form_data,is_create_mode){
      if (is_create_mode){
        alert('创建')
      }else {
        if (this.$refs.class_edit_drawer.do_form_checking()){
          alert('哈哈哈哈')
        }else {
          alert('sss')
        }
        alert('修改')
      }
      alert(form_data.name)
      this.close_drawer()
    },
    handler_class_delete(item){
      alert(JSON.stringify(item))
    },
    handle_members_info(item){
      console.log(item)
      this.info_dialog_open_flag = true
    },
    handle_members_import(){
      this.import_dialog_open_flag = true
    },
    handle_change_when_importing(file){
      this.file_temp = file.raw
      if(this.file_temp){
        if((this.file_temp.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            || (this.file_temp.type === 'application/vnd.ms-excel')){
          // 导入文件，并读取数据封装为json对象，赋值到当前的数据属性中，可以显示到table中进行预览
          this.student_import_data = import_file(this.file_temp)
        } else {
          this.$message.warning('附件格式错误，仅支持excel文件，请删除后重新上传！')
        }
      } else {
        this.$message.warning('请上传附件')
      }
    },
    handle_remove_when_importing(){
      this.file_temp = null
    },
    handle_confirm_student_import(){
      this.$message.success('已成功将所有学生注册到班级中')
      this.handle_import_dialog_close()
    },
    close_drawer(){
      this.drawer_open_flag = false
    },
    handle_import_dialog_close(){
      // 每次关闭导入的对话框都需要重置相关的数据
      this.file_temp = null
      this.student_import_data = []
      this.file_list_upload = []
      this.import_dialog_open_flag = false
    },
    handle_class_file_list(item){
      console.log(item)
      this.class_files_dialog_open_flag = true
    },
    clear_form(){
      this.$refs.class_edit_drawer.reset_form()
    },
    checkout_to_student_info(){
      this.show_student_info = true
      this.dialog_title = '班级学生信息'
    },
    checkout_to_parent_info(){
      this.show_student_info = false
      this.dialog_title = '班级学生家长信息'
    },
  }
}
</script>

<style scoped>

.el-divider{
  margin-top: -20px;
}

.class-manage_content-header{
  height: 100px;
  width: 100%;
  align-items: center;
  display: flex;
  background: #ffffff;
  margin-bottom: 10px;
}

.class-manage_content-box{
  width: 50%;height: 100%;
  text-align: center;
  font-weight: bold;
}

.class-manage_content-val{
  width: 40%;height: 50px;line-height: 50px;
}

.class-manage_drawer-body{
  height: auto;
  padding: 0 10px;
}

/deep/.el-input{
  width: 90%;
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