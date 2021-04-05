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
            {{time_desc}}<strong>陈城</strong>老师
            <i class="el-icon-arrow-down" style="cursor: pointer"></i>
          </label>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-switch-button" style="color: #39A2EF" @click.native="logout">退出登录</el-dropdown-item>
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

export default {
  name: "Header",
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
    }
  },
  data() {
    return {
      user_form: {
        teacher_no: '1625110164',
        name: '陈城',
        gender: '男',
        contact: '18945322322',
        address: '福建省厦门市华侨大学',
        job_title: '讲师'
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
    logout() {
      this.$router.push(base_path + '/login')
    },
    open_user_info_dialog(){
      this.user_info_dialog_open = true
    },
    open_update_phone_dialog(){
      this.update_phone_dialog_open = true
    },
    sending_sms() {

    },
    submit_update(){
      this.$refs.update_phone_form.validate( valid => {
        if (valid){
          console.log('')

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