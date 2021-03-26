<template>
  <div>
    <div class="course-manage_content-header">
      <div class="course-manage_content-box">
        <div class="course-manage_content-val">
          <label style="font-size: 16px">课程总数</label>
        </div>
        <div class="course-manage_content-val">
          <label style="font-size: 28px">{{course_meta_data.length}}</label>
        </div>
      </div>
      <div class="course-manage_content-box">
        <div style="float: right;height: 100px;line-height: 100px;text-align: center;align-items: center">
          <el-button icon="el-icon-circle-plus-outline"
                     @click="create_course" type="primary"
                     style="width: 140px;height: 50px;margin-right: 50px">发布新课程</el-button>
        </div>
      </div>
    </div>
    <course-info-item
        :course_info_data="course_meta_data"
        :course_election_btn_handler="handle_course_election_info"
        :course_files_list_handler="handle_course_file_list"
        :delete_btn_handler="handler_course_delete"
        :edit_btn_handler="handle_course_info_edit">
    </course-info-item>
    <el-drawer title="创建班级" size="500px"
               @close="clear_form"
               :visible.sync="drawer_open_flag"
               :close-on-press-escape="false"
               :wrapper-closable="false">
      <el-divider></el-divider>
      <div class="course-manage_drawer-body">
        <course-edit-drawer
            ref="class_edit_drawer"
            :form_submit_handler="handle_form_submit"
            @cancel-submit="close_drawer"></course-edit-drawer>
      </div>
    </el-drawer>
    <el-dialog title="学生选课信息" :visible.sync="info_dialog_open_flag" width="800px" center>
      <el-table :data="course_election_data" height="500">
        <el-table-column property="student_no" label="学号"></el-table-column>
        <el-table-column property="class_name" label="班级名称"></el-table-column>
        <el-table-column property="student_name" label="姓名" ></el-table-column>
        <el-table-column property="gender" label="性别" width="100px"></el-table-column>
        <el-table-column property="contact" label="联系方式"></el-table-column>
      </el-table>
      <div style="margin-top: 20px;width: 100%;text-align: right;font-size: 16px;font-weight: bold">
        <label style="margin-right: 10px">选课学生总数：{{course_election_data.length}}</label>
      </div>
    </el-dialog>
    <el-dialog title="课程文件" :visible.sync="course_files_dialog_open_flag" width="500px" center>
      <file-card :file_data_list="attachment_data"></file-card>
    </el-dialog>
  </div>
</template>

<script>
import {
  mock_attachment_data,
  mock_course_data, mock_course_election_data, mock_student_contact_data,
} from "@/utils/data_mock_util";
import CourseInfoItem from "@/components/course-info-item";
import CourseEditDrawer from "@/components/course-edit-drawer";
import FileCard from "@/components/file-card";
export default {
  name: "course-manage",
  components: {FileCard, CourseEditDrawer, CourseInfoItem},
  data(){
    return{
      course_meta_data: mock_course_data(),
      course_election_data: mock_course_election_data(mock_student_contact_data(56)),
      drawer_open_flag: false,
      info_dialog_open_flag: false,
      course_files_dialog_open_flag: false,
      attachment_data: mock_attachment_data()
    }
  },
  methods:{
    handle_course_info_edit(origin){
      this.drawer_open_flag = true
      // 传递数据给子组件进行修改
      setTimeout(() => {
        // 这里必须要进行超时调用，因为需要子组件先实例化
        this.$refs.class_edit_drawer.on_edit_call(origin)
      },10)
    },
    create_course(){
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
    handler_course_delete(item){
      alert(JSON.stringify(item))
    },
    handle_course_election_info(item){
      console.log(item)
      this.info_dialog_open_flag = true
    },
    close_drawer(){
      this.drawer_open_flag = false
    },
    handle_course_file_list(item){
      console.log(item)
      this.course_files_dialog_open_flag = true
    },
    clear_form(){
      this.$refs.class_edit_drawer.reset_form()
    },
  }
}
</script>

<style scoped>

.el-divider{
  margin-top: -20px;
}

.course-manage_content-header{
  height: 100px;
  width: 100%;
  align-items: center;
  display: flex;
  background: #ffffff;
  margin-bottom: 10px;
}

.course-manage_content-box{
  width: 50%;height: 100%;
  text-align: center;
  font-weight: bold;
}

.course-manage_content-val{
  width: 40%;height: 50px;line-height: 50px;
}

.course-manage_drawer-body{
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