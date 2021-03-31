<template>
  <div style="width: 100%;height: auto;display: block;" >
    <div style="width: 100%;height: 100px;margin-bottom: 20px;display: flex;background: #ffffff">
      <div style="width: 20%;margin-left: 20px;text-align: center; ">
        <div style="height: 60px;line-height: 60px;font-size: 20px;font-weight: bold">通知总数</div>
        <div style="height: 40px;line-height: 20px;font-size: 20px">{{notification_meta_data.length}}(条)</div>
      </div>
      <div style="width: 80%;line-height: 100px">
        <div style="float: right">
          <el-button type="success" style="width: 140px;height: 50px;margin-right: 40px"
                     icon="el-icon-message-solid" @click="handle_drawer_open">发布通知</el-button>
        </div>
      </div>
    </div>
    <div style="width: 100%;height: 50px;margin-bottom: 20px;display: flex;">
      <div style="width: 200px;height: 50px;line-height: 50px;margin-right: 20px;">
        <el-select v-model="curr_nt_type" @change="handle_selector_change">
          <el-option
            v-for="item in nt_type_selection"
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
                v-for="item in search_selection"
                :key="item.val"
                :label="item.label"
                :value="item.val">
            </el-option>
          </el-select>
        </div>
        <div style="margin-right: 5px;width: 250px">
          <el-input placeholder="请输入搜索关键字" v-model="search_key" ></el-input>
        </div>
        <div>
          <el-button plain icon="el-icon-search" @click="handle_data_filter"></el-button>
        </div>
      </div>
      <div style="width: 120px;height: 50px;line-height: 50px">
        <el-button plain icon="el-icon-refresh"
                   @click="() => {this.notification_tb_render_data = this.notification_meta_data}">重新加载</el-button>
      </div>
    </div>
    <div>
      <el-table :data="notification_tb_render_data" stripe  >
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column property="title" label="通知标题" width="180"></el-table-column>
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
    <el-drawer title="发布新通知" size="500px"
               style="font-size: 20px"
               @close="handle_drawer_close"
               :visible.sync="create_drawer_open_flag" >
      <el-divider></el-divider>
      <el-form :model="notification_form" ref="notification_form"
               :rules="notification_form_rules" status-icon label-width="120px"
               label-position="right">
        <el-form-item label="通知标题" prop="title" >
          <el-input v-model="notification_form.title" placeholder="请输入通知标题"></el-input>
        </el-form-item>
        <el-form-item label="通知内容" prop="content">
          <el-input v-model="notification_form.content" placeholder="请输入通知内容"></el-input>
        </el-form-item>
        <el-form-item label="通知类型" prop="type">
          <el-select v-model="notification_form.type" @change="handle_selector_change">
            <template v-for="item in nt_type_selection">
              <el-option
                  v-if="item.val !== -1"
                  :key="item.val"
                  :label="item.label"
                  :value="item.val">
              </el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="通知确认" prop="confirmable">
          <el-radio v-model="confirm_radio" label="no" border>无需确认</el-radio>
          <el-radio v-model="confirm_radio" label="yes" border>需要确认</el-radio>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <div class="nt-form-submit-btn_wrapper">
        <el-button type="primary" style="width: 120px" @click="handle_form_submit">提交</el-button>
        <el-button type="info" style="width: 120px" plain @click="handle_drawer_close">取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {mock_notification_data, mock_nt_members_info} from "@/utils/data_mock_util";
import FileCard from "@/components/file-card";
import CommonPagination from "@/components/pagination";
import {get_max_length_checker, get_string_checker} from "@/utils/checker_util";
import {deeply_copy_obj, form_check, form_clear} from "@/provider/common_provider";
import {filter_by} from "@/provider/data_filter_delegator";

export default {
  name: "notification-manage",
  components: {CommonPagination, FileCard},
  data(){
    return {
      notification_meta_data: mock_notification_data(),
      // 表格渲染数据，meta_data只用作原始数据的保存封装
      notification_tb_render_data: deeply_copy_obj(mock_notification_data()),
      attachment_dialog_open_flag: false,
      notification_member_dialog_open_flag: false,
      // 当前附件信息的数据集
      curr_attachment_data: [],
      // 当前通知成员的数据集
      curr_members_info: [],
      table_loading: true,
      nt_type_selection: [
        {label: '所有类型', val: -1},
        {label: '文本通知', val: 0 },
        {label: '附件通知', val: 1 },
        {label: '短信通知', val: 2 },
      ],
      curr_nt_type: -1,
      create_drawer_open_flag: false,
      notification_form:{
        account: 0,
        title: '',
        content: '',
        type: 0,
        confirmable: false,
        // 发布对象的id集合，发布对象可以是班级，学生或家长
        pidList: []
      },
      notification_form_rules:{
        title: [
            get_string_checker('通知标题不能为空'),
            get_max_length_checker(16),
        ],
        content: [
            get_string_checker('通知内容不能为空'),
            // 文本通知以及附件通知的最大长度为256，如果超出该长度，建议用户将通知内容写入文件中并上传
            // 当选中通知类型为短信通知时，此时通知内容的长度不能超过60
            get_max_length_checker(256),
        ],
      },
      confirm_radio: 'no',
      search_key: '',
      search_type: 'title',
      search_selection: [
        {label: '搜索标题', val: 'title'},
        {label: '搜索内容', val: 'content'}
      ]
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
    },
    handle_drawer_open(){
      this.create_drawer_open_flag = true
    },
    handle_drawer_close(){
      // 清除表单数据后再关闭
      form_clear(this,'notification_form')
      this.create_drawer_open_flag = false
    },
    handle_selector_change(val){
      let msg = this.nt_type_selection.find( obj => {
        if (obj.val === val){
          return obj
        }
      })
      this.$message.success(msg.label)
    },
    handle_form_submit(){
      if (form_check(this,'notification_form')){
        let data = deeply_copy_obj(this.notification_form)
        console.log(data)
        this.create_drawer_open_flag  = false
        this.$message.success('已成功发布通知')
      }
    },
    handle_data_filter(){
      this.$message.info('search')
      this.notification_tb_render_data = filter_by(this.notification_meta_data,'title',this.search_key)
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

.nt-form-submit-btn_wrapper{
  margin-top: 30px;
  width: 100%;
  height: 150px;
  text-align: center;
  line-height: 150px;
}

</style>