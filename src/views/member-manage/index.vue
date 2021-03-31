<template>
  <div style="width: 100%;height: auto;display: block;" >
    <div style="width: 100%;height: 100px;margin-bottom: 20px;display: flex;background: #ffffff">
      <div style="width: 20%;margin-left: 20px;text-align: center; ">
        <div style="height: 60px;line-height: 60px;font-size: 20px;font-weight: bold">成员总数</div>
        <div style="height: 40px;line-height: 20px;font-size: 20px">{{student_info_meta_data.length}}</div>
      </div>
      <div style="width: 80%;line-height: 100px">
        <div style="float: right">
        <!--    目前成员管理不需要额外的操作按钮      -->
<!--          <el-button type="success" style="width: 140px;height: 50px;margin-right: 40px"
                     icon="el-icon-message-solid" @click="handle_drawer_open">发布通知</el-button>-->
        </div>
      </div>
    </div>
    <div style="width: 100%;height: 50px;margin-bottom: 20px;display: flex;">
      <div style="width: 200px;height: 50px;line-height: 50px;margin-right: 20px;">
        <el-select v-model="member_class" @change="handle_member_class_change">
          <el-option
              v-for="item in member_class_selection"
              :key="item.val"
              :label="item.label"
              :value="item.val">
          </el-option>
        </el-select>
      </div>
      <div style="width: auto;height: 50px;line-height: 50px;margin-right: 20px;display: flex">
        <div style="width: 160px;margin-right: 5px">
          <el-select v-model="search_type">
            <el-option
                v-for="item in search_type_selection"
                :key="item.val"
                :label="item.label"
                :value="item.val">
            </el-option>
          </el-select>
        </div>
        <div style="margin-right: 5px;width: 250px">
          <el-input :placeholder="'请输入要搜索的'+transfer_text(search_type)" v-model="search_key" ></el-input>
        </div>
        <div>
          <el-button plain icon="el-icon-search" @click="handle_search"></el-button>
        </div>
      </div>
      <div style="width: 120px;height: 50px;line-height: 50px">
        <el-button plain icon="el-icon-refresh"
                   @click="() => {this.table_render_data = this.student_info_meta_data}">重新加载</el-button>
      </div>
    </div>
    <div style="height: auto;overflow-y: hidden!important;">
      <member-table :table_render_data="table_render_data"
                    :remove_member_handler="handle_member_remove"
                    :publish_nt_handler="handle_dialog_open"></member-table>
    </div>
    <div>
      <common-pagination></common-pagination>
    </div>
    <el-dialog :visible.sync="nt_dialog_open_flag" title="发布文本通知" width="600px" center>
        <!--  成员管理界面的通知发布仅支持发布文本通知    -->
      <el-form :model="text_notification_form" ref="text_notification_form"
               :rules="form_rules" status-icon label-width="120px"
               label-position="right">
        <el-form-item label="通知标题" prop="title" >
          <el-input v-model="text_notification_form.title" placeholder="请输入通知标题"></el-input>
        </el-form-item>
        <el-form-item label="通知内容" prop="content">
          <el-input v-model="text_notification_form.content" placeholder="请输入通知内容"
                    type="textarea"  show-word-limit
                    maxlength="256"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="success" style="width: 120px" round
                   @click="handle_nt_publish">发布</el-button>
        <el-button type="info" plain style="width: 120px" round
                   @click="handle_dialog_close">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CommonPagination from "@/components/pagination";
import {mock_student_contact_data} from "@/utils/data_mock_util";
import {deeply_copy_obj, form_check} from "@/provider/common_provider";
import MemberTable from "@/components/member-table";
import {filter_by_class, filter_by_name, filter_by_student_no} from "@/provider/data_filter_delegator";
import {get_max_length_checker, get_string_checker} from "@/utils/checker_util";

export default {
  name: "index",
  components: { MemberTable, CommonPagination},
  data() {
    return {
      student_info_meta_data: mock_student_contact_data(10),
      table_render_data: deeply_copy_obj(mock_student_contact_data(10)),
      // 选择显示具体班级的成员，默认显示全部班级
      member_class: 0,
      member_class_selection: [
        {label: '全部班级', val: 0},
        {label: '网络工程1班', val:21},
        {label: '计算机科学与技术2班', val: 22},
        {label: '数字媒体技术3班', val: 23},
        {label: '计算机科学与技术(人工智能方向)1班', val: 32}
      ],
      search_key: '',
      search_type: 'student_no',
      search_type_selection: [
        {label: '学号', val:'student_no'},
        {label: '姓名', val: 'name'}
      ],
      text_notification_form:{
        account: 0,
        title: '',
        content: '',
        // 当前界面仅支持发送文本通知
        type: 0,
        // 只能发送不需确认的通知
        confirmable: false,
        pidList: [],
        member_type: 'student',
        attachment: []
      },
      form_rules: {
        title: [
          get_string_checker('通知标题不能为空'),
          get_max_length_checker(16),
        ],
        content: [
          get_string_checker('通知内容不能为空'),
          get_max_length_checker(256),
        ],
      },
      nt_dialog_open_flag: false,
    }
  },
  methods: {
    handle_search(){
      if (this.search_type === 'student_no'){
        this.table_render_data = filter_by_student_no(this.student_info_meta_data,this.search_key)
      }else if (this.search_type === 'name'){
        this.table_render_data = filter_by_name(this.student_info_meta_data,this.search_key)
      }
    },
    handle_member_class_change(){
      if (this.member_class === 0){
        this.table_render_data = this.student_info_meta_data
      }else {
        let target_item = this.member_class_selection.find( item => {
          return item.val === this.member_class
        })
        // 通过选中的班级的label去筛选数据
        this.table_render_data = filter_by_class(this.student_info_meta_data,target_item.label)
      }
    },
    transfer_text(code){
      switch (code){
        case 'student_no': return '学号'
        case 'name': return '学生姓名'
      }
    },
    handle_dialog_open() {
      this.nt_dialog_open_flag = true
    },
    handle_dialog_close() {
      this.$refs.text_notification_form.resetFields()
      this.nt_dialog_open_flag = false
    },
    handle_nt_publish(){
      if (form_check(this,'text_notification_form')){
        let data = deeply_copy_obj(this.text_notification_form)
        console.log(data)
        this.handle_dialog_close()
        this.$message.success('已成功发布通知')
      }

    },
    handle_member_remove(){

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

.member-remove-btn{
  color: #F56C6C
}
.member-remove-btn:hover{
  color: red;
}

</style>