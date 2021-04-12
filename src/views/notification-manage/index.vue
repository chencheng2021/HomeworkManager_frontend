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
          <el-input placeholder="请输入搜索关键字" v-model="search_key" style="width: 100%!important;"></el-input>
        </div>
        <div>
          <el-button plain icon="el-icon-search" @click="handle_data_filter"></el-button>
        </div>
      </div>
      <div style="width: 120px;height: 50px;line-height: 50px">
        <el-button plain icon="el-icon-refresh"
                   @click="load_page_data">重新加载</el-button>
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
        <el-table-column property="totalConfirm" label="已确认数据" width="100"></el-table-column>
        <el-table-column property="createDate" label="发布日期" sortable></el-table-column>
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
                  <el-button type="text" @click="handle_members_dialog_open(scope.row)">通知成员</el-button>
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
      <common-pagination ref="notification_page" @load-page="refresh_page"></common-pagination>
    </div>
    <el-dialog title="附件信息" :visible.sync="attachment_dialog_open_flag" width="500px" @close="handle_attachment_dialog_close" center>
      <file-card :file_data_list="curr_attachment_data"></file-card>
    </el-dialog>
    <el-dialog title="通知成员信息" :visible.sync="notification_member_dialog_open_flag"
               @close="handle_members_dialog_close">
      <div style="height: 520px">
        <el-table :data="curr_members_info" height="500"
                  v-loading="table_loading"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                  element-loading-text="数据加载中">
          <el-table-column property="member_type" label="成员身份"></el-table-column>
          <el-table-column label="学号">
            <template slot-scope="scope">
              <label v-if="scope.row.student_no !== 0">{{scope.row.student_no}}</label>
              <label v-else>———</label>
            </template>
          </el-table-column>
          <el-table-column property="name" label="姓名" ></el-table-column>
          <el-table-column label="性别" width="100px">
            <template slot-scope="scope">
              <label v-if="scope.row.gender === 1">男</label>
              <label v-else>女</label>
            </template>
          </el-table-column>
          <el-table-column property="class_name" label="班级"></el-table-column>
          <el-table-column property="contact" label="联系方式"></el-table-column>
        </el-table>
      </div>
      <div style="height: 30px;line-height: 30px;margin-left: 30px">
        <label>总人数: {{curr_members_info.length}}</label>
      </div>
    </el-dialog>
    <el-drawer title="发布新通知" size="500px"
               style="font-size: 20px"
               @close="handle_drawer_close"
               :close-on-press-escape="false"
               :close-on-click-modal="false"
               :visible.sync="create_drawer_open_flag" >
      <el-divider></el-divider>
      <el-form :model="notification_form" ref="notification_form"
               :rules="notification_form_rules" status-icon label-width="120px"
               label-position="right">
        <el-form-item label="通知标题" prop="title" >
          <el-input v-model="notification_form.title" placeholder="请输入通知标题"></el-input>
        </el-form-item>
        <el-form-item label="通知内容" prop="content">
          <el-input v-model="notification_form.content" placeholder="请输入通知内容"
                    type="textarea"  show-word-limit
                    style="width: 95%!important;"
                    :maxlength="content_max_len"></el-input>
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
        <el-form-item label="通知对象" prop="member_type">
          <el-select v-model="notification_form.member_type" @change="handle_obj_type_change">
            <el-option
                v-for="item in nt_obj_type_selection"
                :key="item.val"
                :label="item.label"
                :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <div class="nt-form-submit-btn_wrapper">
        <el-button type="primary" style="width: 120px" @click="handle_form_submit">提交</el-button>
        <el-button type="info" style="width: 120px" plain @click="handle_drawer_close">取消</el-button>
      </div>
    </el-drawer>
    <el-dialog :title="nt_obj_dialog_title" :visible.sync="nt_obj_dialog_open_flag"
               :close-on-press-escape="false" center
               :show-close="false" :close-on-click-modal="false">
      <member-table
          ref="selection_table"
          :member_type="notification_form.member_type"
          :selection_mode="true" :table_render_data="notify_members_render_data"
          :selection_change_handler="handle_nt_obj_selection"></member-table>
      <div style="margin-top: 30px;text-align: center">
        <el-button type="success" style="width: 120px" round @click="cache_nt_obj_id">确认</el-button>
        <el-button type="cancel" style="width: 120px" round @click="handle_dialog_close">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible="file_upload_dialog_open" center
               @close="() => {this.file_upload_dialog_open = false}"
               title="附件上传" width="500px">
      <div style="width: 100%;height: 100px">
        <file-upload-btn @upload-success="handle_upload_success"></file-upload-btn>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  mock_class_info_data,
  mock_parent_contact_data,
  mock_student_contact_data
} from "@/utils/data_mock_util";
import FileCard from "@/components/file-card";
import CommonPagination from "@/components/pagination";
import {get_max_length_checker, get_string_checker} from "@/utils/checker_util";
import {deeply_copy_obj, form_check, form_clear} from "@/provider/common_provider";
import {filter_by_content, filter_by_title} from "@/provider/data_filter_delegator";
import MemberTable from "@/components/member-table";
import FileUploadBtn from "@/components/file-upload-btn";
import {
  get_notification_files,
  get_notification_page,
  get_notify_members,
  notify_member,
  publish_notification
} from "@/api/notification_service";
import {get_all_parents, get_all_students} from "@/api/member_service";
import {get_all_classes} from "@/api/class_service";


export default {
  name: "notification-manage",
  components: {FileUploadBtn, MemberTable, CommonPagination, FileCard},

  created() {
    this.$fsloading.initLoading()
    this.load_page_data()
  },

  data(){
    return {
      // 用于保存页面加载页大小和页码以及加载的数量总数
      loaded_page:{
        page_size: 10,
        page_num: 1,
        total: 0
      },
      notification_meta_data:[],
      // 表格渲染数据，meta_data只用作原始数据的保存封装
      notification_tb_render_data: [],
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
      // 通知内容最大长度；文本和附件通知为256，短信通知为：60
      content_max_len: 256,
      // 当前通知类型
      curr_nt_type: -1,
      create_drawer_open_flag: false,
      notification_form:{
        account: 0,
        title: '',
        content: '',
        type: 0,
        confirmable: false,
        // 发布对象的id集合，发布对象可以是班级，学生或家长
        contact_data_list: [],
        member_type: '',
        // 如果是附件通知，还可以上传附件，如果选择了附件通知但是没有上传附件，
        // 那么系统会自动将通知类型修改为文本通知
        attachments:[]
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
      ],
      // 通知对象的类型，通知的对象可以是班级、学生或家长
      nt_obj_type_selection:[
        {label: '通知班级', val: 'class'},
        {label: '通知学生', val: 'student'},
        {label: '通知家长', val: 'parent'}
      ],
      // 选择通知班级时的表格渲染数据
      class_table_render_data:mock_class_info_data(3),
      // 选择通知学生时的表格渲染数据
      student_table_render_data: mock_student_contact_data(56),
      notify_members_render_data: [],
      // 选择通知家长时的表格渲染数据
      parent_table_render_data: mock_parent_contact_data(mock_student_contact_data(56)),
      nt_obj_dialog_open_flag: false,
      nt_obj_dialog_title: '',
      // 在表格多选界面中选择的通知对象信息
      nt_obj_list: [],
      // 在表格进行多选时，点击确认按钮后，数据会保存到该中间数组中
      // 当用户最终确定发布通知时，该中间数组的数据才会被复制到notification_form.pidList中
      temp_selected_member: [],
      file_upload_dialog_open: false,
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
      get_notification_page(this.loaded_page.page_size,this.loaded_page.page_num).then((data) => {
        this.notification_meta_data = data.all_data
        // 分页数据
        this.notification_tb_render_data = data.pagination_data
        this.notification_tb_render_data.forEach(item => {
          let date_time = Number(item.createDate)
          item.createDate = this.process_time(date_time)

          // 初始化通知成员数据和附件数据，该数据第一次获取时需要访问接口
          // 然后会保存起来，后续获取不再需要访问接口
          item.notifyMembers = []
          item.attachments = []
        })
        this.loaded_page.total = data.total
        this.$refs.notification_page.init_total(data.total)
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

    handle_attachment_dialog_open(item){
      if (item.attachments.length > 0){
        this.curr_attachment_data = item.attachments
        this.attachment_dialog_open_flag = true
      }else{
        this.$fsloading.startLoading('正在加载附件数据...')
        get_notification_files(item.id).then((data)=>{
          item.attachments = data
          this.curr_attachment_data = item.attachments
          this.$fsloading.endLoading()
          this.attachment_dialog_open_flag = true
        }).catch(() => {
          this.$fsloading.endLoading()
        })
      }

    },
    handle_attachment_dialog_close(){
      this.curr_attachment_data = []
      this.attachment_dialog_open_flag = false
    },
    handle_members_dialog_open(item){
      this.load_notify_members(item)
      this.table_loading = false
      this.notification_member_dialog_open_flag = true
    },

    load_notify_members(item){
      if (item.notifyMembers.length !== 0){
        this.curr_members_info = item.notifyMembers
      }else {
        get_notify_members(item.id).then((data)=>{
          item.notifyMembers = data
          this.curr_members_info = item.notifyMembers
        }).then(() => {
          this.table_loading = false
        })
      }
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
            // 封装接口数据
            let data_form = {
              notification_id: item.id,
              member_type: item.memberType,
              notify_infos: []
            }

            if (this.curr_members_info.length > 0){
              this.process_notify_infos(data_form)
            }else{
              // 获取通知成员的信息，由于该方法是异步方法，所以必须要写在这里
              get_notify_members(item.id).then((data)=>{
                item.notifyMembers = data
                this.curr_members_info = item.notifyMembers
                this.process_notify_infos(data_form)
                notify_member(data_form).then(() => {
                  done()
                  instance.confirmButtonLoading = false;
                  this.table_loading = false
                }).catch(() => {
                  done()
                  instance.confirmButtonLoading = false;
                  this.table_loading = false
                })
              }).catch(() => {done()})
            }

          }else {
            done()
          }
        })
      }).then( () => {
        this.$message.success('已成功向通知成员发送提醒短信')
      })
    },

    process_notify_infos(data_form){
      let member_type = this.curr_members_info[0].member_type
      // 在调用方法获取通知的对象成员后，成员类型最终只有两种，即学生与家长
      if (member_type === '学生'){
        this.curr_members_info.forEach(cmi => {
          let notifyInfo = {
            publishId: cmi.student_no,
            name: cmi.name,
            contact: cmi.contact
          }
          data_form.notify_infos.push(notifyInfo)
        })
      }else if (member_type === '家长'){
        this.curr_members_info.forEach(cmi => {
          let notifyInfo = {
            publishId: cmi.parent_id,
            name: cmi.name,
            contact: cmi.contact
          }
          data_form.notify_infos.push(notifyInfo)
        })
      }
    },

    handle_drawer_open(){
      this.create_drawer_open_flag = true
    },
    handle_drawer_close(){
      // 清除表单数据后再关闭
      form_clear(this,'notification_form')
      this.create_drawer_open_flag = false
    },
    handle_selector_change(){
      // 如果切换为短信通知时，需要变更内容最大长度
      if (this.notification_form.type === 2){
        this.content_max_len = 60
      }else {
        this.content_max_len = 256
      }
      // 切换为附件通知时需要弹出文件上传的对话框
      if (this.notification_form.type === 1){
        this.file_upload_dialog_open = true
      }
    },
    handle_form_submit(){
      if (form_check(this,'notification_form')){
        // 检查通知对象的设置
        if (this.notification_form.member_type !== ''){
          if (this.temp_selected_member.length !== 0){
            // 将保存发布对象id的中间数组中的值copy到表单的pidList中
            // 每次为pidList增加值时，需要先重置
            this.notification_form.contact_data_list = []
            this.temp_selected_member.forEach( item => {
              this.notification_form.contact_data_list.push(item)
            })
            let data = deeply_copy_obj(this.notification_form)
            if (data.attachments.length === 0){
              if (data.type === 1){
                // 如果选择了附件通知，但是没有上传文件，此时将通知类型修改为文本通知
                data.type = 0
              }
            }
            data.confirmable = this.confirm_radio === 'yes'
            // 调用api
            this.$fsloading.startLoading('正在发布通知...')
            publish_notification(data).then(resp => {
              this.notification_meta_data.push(resp)
              this.$fsloading.endLoading()
              this.create_drawer_open_flag  = false
              this.$message.success('已成功发布通知')
            }).catch(() => {
              this.$fsloading.endLoading()
            })

          }else {
            // 弹出选择通知对象的对话框
            this.handle_dialog_open()
            this.$message.warning('请选择至少一个通知对象！')
          }
        }else {
          this.$message.warning('请选择通知对象类型！')
        }
      }
    },
    handle_data_filter(){
      if (this.search_type === 'title'){
        this.notification_tb_render_data = filter_by_title(this.notification_meta_data,this.search_key)
      }else if (this.search_type === 'content'){
        this.notification_tb_render_data = filter_by_content(this.notification_meta_data,this.search_key)
      }
    },
    handle_obj_type_change(){
      this.handle_dialog_open()
    },
    // 需要进行通过对象数据的获取
    handle_dialog_open(){
      // 计算对话框标题
      let nt_obj_type = this.nt_obj_type_selection.find( item => {
        return item.val === this.notification_form.member_type
      })
      this.nt_obj_dialog_title = '可'+nt_obj_type.label+'列表'
      switch (this.notification_form.member_type) {
        case "student":
          // 加载该教师管理的所有学生的数据
          get_all_students().then((data) => {
            console.log(data)
            this.notify_members_render_data = data
            // 每次打开都需要先清除该中间数组的缓存值，防止多选累加
            this.temp_selected_pid = []
            this.nt_obj_dialog_open_flag = true
          }).catch(() =>{});break
        case "parent":
          // 获取所有家长的数据
          get_all_parents().then((data) => {
            console.log(data)
            this.notify_members_render_data = data
            this.nt_obj_dialog_open_flag = true
          }).catch(() => {});break
        case "class":
          // 获取所有班级的数据
          get_all_classes().then((data) => {
            console.log(data)
            this.notify_members_render_data = data
            this.nt_obj_dialog_open_flag = true
          }).catch(() => {});break
        default:break
      }
    },
    // 关闭选择通知对象的对话框
    handle_dialog_close(){
      // 调用子组件的方法，清除表格中已选数据的记录
      this.$refs.selection_table.clear_selection()
      this.nt_obj_dialog_open_flag = false
    },

    // 通知成员的选择列表的数据保存
    handle_nt_obj_selection(val){
      this.nt_obj_list = val
    },

    cache_nt_obj_id(){
      if (this.nt_obj_list.length !== 0){
        this.nt_obj_list.forEach( item => {
          let id = 0
          let name = ''
          let contact = ''
          let type = this.notification_form.member_type
          let publish_item = {
            publish_id: 0,
            name: '',
            contact: ''
          }
          // 不同的通知成员对应的id属性不一样
          if (type === 'student'){
            id = item.student_no
            name = item.name
            contact = item.contact
          }else if (type === 'parent'){
            id = item.parent_id
            name = item.name
            contact = item.contact
          }else{
            id = item.class_id
          }
          publish_item.publish_id = id
          publish_item.name = name
          publish_item.contact = contact
          this.temp_selected_member.push(publish_item)
        })
        this.handle_dialog_close()
      }else {
        this.$message.warning('请至少选择一个通知对象！')
      }
    },
    handle_upload_success(name,url) {
      // 这里由于是通知创建时发布文件，因此发布的pid会在服务端生成并设置，这里只用作占位属性
      let file = {
        pid:0,
        name: name,
        url: url,
        // 文件发布到通知中，那么发布对象类型是3
        type: 3
      }
      this.notification_form.attachments.push(file);
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

/deep/.el-input{
  width: 95%!important;
}

</style>