<template>
  <div id="header_wrapper">
    <div style="width: 40%;">
      <i class="el-icon-s-platform" style="margin-left: 20px;font-size: 25px;"></i>
      <label style="font-size: 20px;margin-left: 5px;color: #ffffff;">
        小学生作业推送管理系统-教师端
      </label>
    </div>
    <div style="width: 60%;">
      <div style="float:right;width: 300px;">
        <el-dropdown trigger="click">
          <label style="margin-right: 50px;font-size: 18px;color: #ffffff">
            {{time_desc}}<strong>{{user_form.name}}</strong>老师
            <i class="el-icon-arrow-down" style="cursor: pointer"></i>
          </label>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-switch-button" style="color: #39A2EF" @click.native="do_logout">退出登录</el-dropdown-item>
            <el-dropdown-item icon="el-icon-user" style="color: #39A2EF" @click.native="open_user_info_dialog">个人信息</el-dropdown-item>
            <el-dropdown-item icon="el-icon-mobile-phone" style="color: #39A2EF" @click.native="open_update_phone_dialog">修改手机</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-dialog :visible.sync="user_info_dialog_open" title="个人信息" center width="650px" >
      <div style="height: auto;margin-bottom: 50px">
        <div style="width: 100%;display: flex;margin-bottom: 20px">
          <div style="width: 300px;margin-right: 10px">
            <el-card shadow="hover" class="user-info-card">教工号: {{user_form.teacher_no}}</el-card>
          </div>
          <div style="width: 300px;margin-right: 10px">
            <el-card shadow="hover" class="user-info-card">姓名: {{user_form.name}}</el-card>
          </div>
        </div>
        <div style="width: 100%;display: flex;margin-bottom: 20px">
          <div style="width: 300px;margin-right: 10px">
            <el-card shadow="hover" class="user-info-card">性别: {{user_form.gender}}</el-card>
          </div>
          <div style="width: 300px;margin-right: 10px">
            <el-card shadow="hover" class="user-info-card">绑定手机: {{user_form.contact}}</el-card>
          </div>
        </div>
        <div style="width: 100%;display: flex;margin-bottom: 20px">
          <div style="width: 450px;margin-right: 10px">
            <el-card shadow="hover" class="user-info-card">住址: {{user_form.address}}</el-card>
          </div>
          <div style="width: 150px;margin-right: 10px">
            <el-card shadow="hover" class="user-info-card">职称: {{user_form.job_title}}</el-card>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="update_phone_dialog_open" center title="修改绑定手机" width="500px">
      <el-form :model="update_phone_form" :rules="phone_form_rules" ref="update_phone_form"
               label-position="right" label-width="80px" status-icon>
        <el-form-item prop="phone" label="新手机">
          <el-input v-model="update_phone_form.phone"></el-input>
        </el-form-item>
        <el-form-item prop="verify_code" label="验证码">
          <el-input v-model="update_phone_form.verify_code"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-bottom: 20px;text-align: center">
        <el-button type="primary" round @click="sending_sms">获取验证码</el-button>
        <el-button type="success" round @click="submit_update">提交修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {base_path} from "@/provider/common_provider";
import {get_code_checker, get_phone_checker} from "@/utils/checker_util";
import {send, verify} from "@/api/sms_service";
import {logout, update_phone} from "@/api/user_service";
import {clear_token} from "@/utils/authenticate_util";
import {obtain_user, remove} from "@/provider/local_storage_provider";

export default {
  name: "Header",
  created() {
    this.user_form = obtain_user()
  },
  computed:{
    time_desc(){
      let now = new Date()
      let hours = now.getHours();
      if (hours >= 6 && hours < 12 ){
        return '上午好，'
      }else if (hours >= 12 && hours < 14){
        return '中午好，'
      }else if (hours >= 14 && hours < 19){
        return '下午好，'
      }else {
        return '晚上好，'
      }
    },

  },
  data() {
    return {
      user_form: {
        teacher_no: 0,
        name: '',
        contact: '',
        gender: '',
        address: '',
        job_title: ''
      },
      update_phone_form: {
        phone: '',
        verify_code: ''
      },
      phone_form_rules:{
        phone: [{validator: get_phone_checker(), trigger: 'blur'},{required:true}],
        verify_code: [{validator: get_code_checker(), trigger: 'blur'},{required:true}]
      },
      user_info_dialog_open: false,
      update_phone_dialog_open: false
    }
  },
  methods: {
    do_logout() {
      logout().then(() => {
        // 清除本地的登录凭证
        clear_token()
        remove(this.user_form.teacher_no)
        // 回到登录页
        this.$router.push(base_path + '/login')
      }).catch(() => {})
    },
    open_user_info_dialog(){
      this.user_info_dialog_open = true
    },
    open_update_phone_dialog(){
      this.update_phone_dialog_open = true
    },
    sending_sms() {
      let phone = this.update_phone_form.phone
      if (phone !== ''){
        if (phone !== this.user_form.contact){
          if ((/^1[3456789]\d{9}$/.test(phone))){
            send(Number(0),phone,"updatePhone").then( () => {
              this.$message.success('已成功向手机号'+this.update_phone_form.phone+'发送短信')
            }).catch( () => {} )
          }else {
            this.$message.warning('请输入正确的手机号码')
          }
        }else {
          this.$message.warning('新绑定的手机不能与旧手机号相同')
        }

      }else {
        this.$message.warning('请输入手机号码')
      }
    },
    submit_update(){
      this.$refs.update_phone_form.validate( valid => {
        if (valid){
          let phone = this.update_phone_form.phone;
          verify(phone, this.update_phone_form.verify_code,"updatePhone").then(() => {
            update_phone(this.update_phone_form).then( () => {
              // 更新当前绑定的渲染数据
              this.user_form.contact = phone
              // 更新store缓存
              this.$store.dispatch('UpdateContact', phone)
              this.update_phone_dialog_open = false
              this.$message.success('已成功修改绑定手机为'+phone)
            }).catch(() => {})
          }).catch(() => {})
        }else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

#header_wrapper{
  display: flex;
  line-height: 60px;
  height: 100%;
  width: 100%;
  background: #95C9FF;
}

.user-info-card{
  width: 100%;background-color: #F2F6FC
}

</style>