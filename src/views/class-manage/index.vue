<template>
  <div>
    <div class="class-manage_content-header">
      <div class="class-manage_content-box">
        <div class="class-manage_content-val">
          <label style="font-size: 16px">班级总数</label>
        </div>
        <div class="class-manage_content-val">
          <label style="font-size: 28px">{{class_meta_data.length}}</label>
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
        :file_publish_handler="handle_upload_dialog_open"
        :class_files_list_handler="handle_class_file_list"
        :members_import_btn_handler="handle_members_import"
        :contact_btn_handler="handle_members_info"
        :dismiss_btn_handler="handler_class_delete"
        :edit_btn_handler="handle_class_info_edit">
    </class-info-item>
    <el-drawer title="创建班级" size="500px"
               style="font-size: 20px"
               @close="close_drawer"
               :visible.sync="drawer_open_flag"
               :close-on-press-escape="false"
               :wrapper-closable="false">
      <el-divider></el-divider>
      <div class="class-manage_drawer-body">
        <class-edit-drawer
            ref="class_edit_drawer"
            @close="close_drawer"
            :form_submit_handler="handle_form_submit"></class-edit-drawer>
      </div>
    </el-drawer>
    <el-dialog :title="dialog_title" :visible.sync="info_dialog_open_flag" width="800px" center
               @close="() => {this.checkout_to_student_info();this.info_dialog_open_flag = false}">
      <el-table :data="members_tb_render_data" height="500" v-if="show_student_info">
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
    <el-dialog title="导入学生信息" :visible.sync="import_dialog_open_flag" width="1200px" center
               :before-close="handle_import_dialog_close"
               :close-on-click-modal="false">
      <el-table :data="student_import_data" height="500">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column property="student_no" label="学号"></el-table-column>
        <el-table-column property="name" label="姓名" ></el-table-column>
        <el-table-column property="gender" label="性别" width="100px"></el-table-column>
        <el-table-column property="contact" label="联系方式"></el-table-column>
        <el-table-column property="email" label="邮箱"></el-table-column>
        <el-table-column property="social_account" label="QQ号"></el-table-column>
        <el-table-column property="father_name" label="父亲"></el-table-column>
        <el-table-column property="mother_name" label="母亲"></el-table-column>
        <el-table-column property="father_contact" label="父亲手机"></el-table-column>
        <el-table-column property="mother_contact" label="母亲手机"></el-table-column>
      </el-table>
      <div style="margin-top: 20px;width: 100%;text-align: center;display: flex;justify-content: center">
        <el-upload action="" :on-exceed="() => {this.$message.warning('单次只能上传一个文件')}"
                   :on-change="handle_change_when_importing"
                   :on-remove="handle_remove_when_importing" :file-list="file_list_upload"
                   :auto-upload="false"
                   :limit="1" name="file"
                   accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel">
          <el-button slot="trigger" type="primary"  round style="margin-right: 20px">选择文件</el-button>
          <el-popconfirm title="确定将以上学生都注册到班级中吗？" @confirm="handle_confirm_student_import">
            <el-button type="success" round slot="reference">确认导入</el-button>
          </el-popconfirm>
        </el-upload>
      </div>
    </el-dialog>
    <el-dialog title="班级文件" :visible.sync="class_files_dialog_open_flag" width="500px" center>
      <file-card :file_data_list="attachment_tb_render_data"></file-card>
    </el-dialog>
    <el-dialog :visible.sync="upload_dialog_open_flag" center title="文件上传" width="500px">
      <div style="width: 100%;height: 100px">
        <file-upload-btn @upload-success="handle_upload_dialog_close"></file-upload-btn>
      </div>
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
import {add_class_member, create_class, delete_class, get_class_list, update_class_info} from "@/api/class_service";
import {validate_student_imported_data} from "@/utils/checker_util";
import FileUploadBtn from "@/components/file-upload-btn";
import {publish_file} from "@/api/file_service";
export default {
  name: "class-manage",
  components: {FileUploadBtn, FileCard, ClassEditDrawer, ClassInfoItem},
  created() {
    this.$fsloading.initLoading()
    get_class_list().then(data => {
      this.class_meta_data = data
      this.$fsloading.endLoading()
    }).catch(() => {
      this.$fsloading.endLoading()
    })
  },
  data(){
    return{
      class_meta_data: mock_class_info_data(),
      // 班级成员的表格渲染数据，选择打开不同班级的成员信息时那么数据也不一样
      members_tb_render_data:[],
      // 班级学生的家长信息
      student_parent_info: mock_parent_contact_data(mock_student_contact_data()),
      // 班级上传文件的表格渲染数据
      attachment_tb_render_data: mock_attachment_data(),
      dialog_title: '班级学生信息',
      show_student_info: true,
      drawer_open_flag: false,
      info_dialog_open_flag: false,
      import_dialog_open_flag: false,
      student_import_data: [],
      file_temp: null,
      file_list_upload:[],
      class_files_dialog_open_flag: false,
      // class-info-item子组件点击按钮时对应的绑定的数据的班级id
      curr_operate_class_id: 0,
      upload_dialog_open_flag: false
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
    // 班级创建或班级信息修改
    handle_form_submit(form_data,is_create_mode){
      this.$refs.class_edit_drawer.do_form_checking()
      this.$fsloading.startLoading('正在提交数据...')
      if (is_create_mode){
        // 班级创建
        create_class(form_data).then( data => {
          this.class_meta_data.push(data)
          this.$fsloading.endLoading()
          this.$message.success('已成功创建新的班级')
        }).catch(() => {
          this.$fsloading.endLoading()
        })
      }else {
        update_class_info(form_data).then(() => {
          // 更新绑定的数据
          this.class_meta_data.forEach(_class => {
            if (_class.id === form_data.id){
              _class.name = form_data.name
              _class.class_code = form_data.class_code
            }
          })
          this.$fsloading.endLoading()
          this.$message.success('修改班级信息成功')
        }).catch(() => {
          this.$fsloading.endLoading()
        })
      }
      this.close_drawer()
    },
    handler_class_delete(item){
      this.$fsloading.startLoading('正在提交删除...')
      delete_class(item.id).then( () => {
        let class_data = []
        this.class_meta_data.forEach( data => {
          if (data.id !== item.id){
            class_data.push(data)
          }
        })
        // 绑定删除指定项后的数据
        this.class_meta_data = class_data
        this.$fsloading.endLoading()
        this.$message.success('已成功删除该班级！')
      }).catch(() => {
        this.$fsloading.endLoading()
      })
    },
    handle_members_info(item){
      this.class_meta_data.forEach( _class => {
        if (_class.id === item.id){
          this.members_tb_render_data = _class.member_data
        }
      })
      this.info_dialog_open_flag = true
    },
    handle_members_import(item){
      this.curr_operate_class_id = item.id
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
      // 校验当前从xlsx文件导入的数据
      if (this.student_import_data.length > 0){
        // 校验数据合法性
        let item = this.student_import_data[0]
        if (validate_student_imported_data(item)){
          // 将gender属性由中文替换为数值
          this.student_import_data.forEach( data => {
            let gender = data.gender;
            switch (gender){
              case "男": data.gender = 1;break
              case "女": data.gender = 0;break
              default:break
            }
          })
          this.$fsloading.startLoading('正在导入...')
          add_class_member(this.curr_operate_class_id,this.student_import_data).then(() => {
            this.$fsloading.endLoading()
            this.$message.success('已成功将所有学生注册到班级中')
            this.handle_import_dialog_close()
          }).catch(() => {
            this.$fsloading.endLoading()
          })
        }
      }else {
        this.$message.warning('请选择文件并导入有效数据！')
      }

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
      this.class_meta_data.forEach( _class => {
        if (_class.id === item.id){
          this.attachment_tb_render_data = _class.class_files
        }
      })
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
    handle_upload_dialog_open(item) {
      this.curr_operate_class_id = item.id
      this.upload_dialog_open_flag = true
    },
    handle_upload_dialog_close(file){
      this.upload_dialog_open_flag = false
      this.$fsloading.startLoading('正在发布文件...')
      publish_file(file.id,this.curr_operate_class_id).then(() => {
        // 更新本地数据
        this.class_meta_data.forEach(data => {
          if (data.id === this.curr_operate_class_id){
            data.class_files.push(file)
          }
        })
        this.$fsloading.endLoading()
        this.$message.success('文件已发布成功！')
      }).catch(() => {
        this.$fsloading.endLoading()
      })
    }
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