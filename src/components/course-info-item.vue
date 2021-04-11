<template>
  <div class="course-item_wrapper" v-if="course_info_data.length > 0">
    <div v-for="item in course_info_data" :key="item.id">
      <el-card class="course-card_wrapper">
        <div class="course-info_content_wrapper">
          <div class="course-info_wrapper">
            <div class="course-info-item_top">
              <div style="height: 50px;width: 50px;text-align: center">
                <i class="el-icon-reading" style="font-size: 40px;margin-top: 5px"></i>
              </div>
              <div class="course-info-item-name">
                <label>{{item.name}}</label>
              </div>
            </div>
            <div class="course-info-item_full">
              <div class="course-info-item-operator">
                <el-button type="text" icon="el-icon-document-checked"
                           @click="course_election_btn_handler(item)"
                           style="font-size: 13px">选课信息</el-button>
              </div>
              <div class="course-info-item-operator">
                <el-button type="text"  icon="el-icon-edit" style="font-size: 13px"
                           @click="edit_btn_handler(item)">编辑信息</el-button>
              </div>
              <div class="course-info-item-operator">
                <el-button type="text"  icon="el-icon-paperclip" style="font-size: 13px"
                           @click="course_files_list_handler(item)">课程文件</el-button>
              </div>
              <div class="course-info-item-operator" style="width: auto">
                <el-dropdown trigger="click">
              <span style="cursor: pointer;color: #409EFF">
                更多操作
              <i class="el-icon-setting"></i>
              </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <el-button type="text" @click="open_homework_dialog(item)">发布作业</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button type="text" @click="open_file_upload(item)">发布文件</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-popconfirm confirm-button-text="确定" title="是否确认删除该课程?"
                                     @confirm="check_before_delete(item)"
                                     icon="el-icon-info" icon-color="red">
                        <el-button slot="reference" type="text" >删除课程</el-button>
                      </el-popconfirm>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>
          <div class="course-info_wrapper" style="font-size: 14px">
            <div class="course-info-item_full">
              <div class="course-info-item-val">
                <label>课程学分</label>
              </div>
              <div class="course-info-item-val">
                <label>上课时间</label>
              </div>
              <div class="course-info-item-val">
                <label>课程周期</label>
              </div>
            </div>
            <div class="course-info-item_full">
              <div class="course-info-item-val">
                <label>{{item.credit}}</label>
              </div>
              <div class="course-info-item-val">
                <label>{{item.class_time}}</label>
              </div>
              <div class="course-info-item-val">
                <label>{{item.course_period}}周</label>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <el-dialog center width="500px" title="发布课程作业"
               @close="cancel_publish_homework"
               :visible.sync="homework_dialog_open">
      <el-form :model="homework_publish_form" :rules="homework_rules" ref="homework_publish_form" label-position="right">
        <el-form-item prop="content" label="通知内容">
          <el-input type="textarea" show-word-limit maxlength="64"
              v-model="homework_publish_form.content"
                    style="width: 80%"
                    placeholder="请输入通知内容"></el-input>
        </el-form-item>
        <el-form-item label="可确认性" prop="confirmable" style="margin-top: 10px">
          <el-radio-group v-model="homework_publish_form.confirmable">
            <el-radio-button label="需要确认"></el-radio-button>
            <el-radio-button label="不需确认"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <div style="text-align: center;margin-top: 50px">
          <el-button type="primary" round style="width: 100px" @click="handle_homework_publish" >确认</el-button>
          <el-button type="info" round style="width: 100px" @click="cancel_publish_homework">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog center width="500px" title="发布课程文件" :visible.sync="file_upload_dialog_open"
               @close="cancel_upload_file">
      <div style="height: 150px">
        <file-upload-btn @upload-success="handle_file_upload"></file-upload-btn>
      </div>
    </el-dialog>
  </div>
  <div v-else>
    <empty-data></empty-data>
  </div>
</template>

<script>

import EmptyData from "@/components/empty-data";
import {get_string_checker} from "@/utils/checker_util";
import {deeply_copy_obj} from "@/provider/common_provider";
import FileUploadBtn from "@/components/file-upload-btn";
export default {
  name: "course-info-item",
  components: {FileUploadBtn, EmptyData},
  props:{
    course_info_data:{
      type: Array,
      default: () => {
        return []
      }
    },
    delete_btn_handler:{
      type: Function,
      default: () => {
        alert('delete handler is not defined!')
      }
    },
    edit_btn_handler:{
      type: Function,
      default: () => {
        alert('edit handler is not defined!')
      }
    },
    course_election_btn_handler:{
      type: Function,
      default: () => {
        alert('course election handler is not defined!')
      }
    },
    course_files_list_handler:{
      type: Function,
      default: () => {
        alert('files list handler is not defined!')
      }
    },
    homework_publish_handler:{
      type: Function,
      default: () => {
        alert('homework publish handler is not defined!')
      }
    },
    file_publish_handler:{
      type: Function,
      default: () => {
        alert('file publish handler is not defined!')
      }
    }
  },
  data(){
    return{
      course_list_data: this.course_info_data,
      homework_dialog_open: false,
      file_upload_dialog_open: false,
      homework_publish_form: {
        title: '作业通知',
        content: '',
        confirmable: "不需确认"
      },
      homework_rules:{
        content:[get_string_checker('请输入通知内容')],
        confirmable: [{required:true}]
      },
      selected_course: null
    }
  },
  methods:{
    check_before_delete(item){
      if (typeof item.course_election_data !== "undefined" && item.course_election_data.length === 0){
        this.delete_btn_handler(item)
      }else{
        this.$message.warning('该课程已有学生选课，无法删除')
      }
    },
    on_contact_click(item){
      console.log(item)
    },
    open_homework_dialog(item){
      if (typeof item.course_election_data !== "undefined" && item.course_election_data.length > 0){
        // 保存选中项，需要跨方法进行参数传递
        this.selected_course = item
        this.homework_dialog_open = true
      }else{
        this.$message.info("该课程没有选课数据，无法发布作业")
      }

    },
    open_file_upload(item){
      if (typeof item.course_election_data !== "undefined" && item.course_election_data.length > 0){
        this.selected_course = item
        this.file_upload_dialog_open = true
      }else {
        this.$message.info("该课程没有选课数据，无法发布文件")
      }
    },
    handle_homework_publish(){
      this.$refs.homework_publish_form.validate(valid=>{
        if (valid){
          let data = deeply_copy_obj(this.homework_publish_form)
          // 将文字转为为 0 或 1,0代表不需确认，1代表需要确认
          this.homework_publish_handler(data,this.selected_course)
        }
      })
    },
    handle_file_upload(name,url){
      this.file_publish_handler(name,url,this.selected_course)
    },
    cancel_publish_homework(){
      this.$refs.homework_publish_form.resetFields()
      this.homework_dialog_open = false
    },
    cancel_upload_file(){
      this.file_upload_dialog_open = false
    }
  }
}
</script>

<style scoped>

/deep/.el-button{
  font-size: 13px!important;
}

/deep/.el-form-item__error{
  left: 80px;
}

.course-item_wrapper{
  width: 100%;
  height: 800px;
  padding: 10px 0;
  overflow-y: scroll;
  overflow-x: hidden;
}

.course-card_wrapper{
  height: 140px;margin-top: 10px;
  width: 100%;
  display: block;
  transition: .2s;
  cursor: pointer;
}

.course-card_wrapper:hover{
  transform: translateY(-2px) translateX(2px);
}

.course-info_content_wrapper{
  display: flex;
  height: 100px;
  width: 100%;
}

.course-info_wrapper{
  width: 50%;
  height: 100%;
  cursor: pointer;
}

.course-info-item_top{
  display: flex;
  width: 80%;
  height: 50px;
}

.course-info-item_full{
  display: flex;
  width: 100%;
  height: 50px;
  text-align: center;
}

.course-info-item-name{
  height: 50px;
  line-height: 50px;
  width: auto;
  font-size: 25px;
  font-weight: bold;
}

.course-info-item-name:hover{
  color: #1d8fff;
}

.course-info-item-operator{
  height: 50px;
  line-height: 50px;
  width: auto;
  margin-right: 20px;
  color: #1d8fff;
}

.course-info-item-val{
  width: 30%;
  height: 50px;
  margin-right: 20px;
  line-height: 50px;
}

</style>