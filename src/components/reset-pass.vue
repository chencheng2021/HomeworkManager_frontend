<template>
  <div style="height: auto;width: 100%;text-align: center">
    <el-form :model="reset_pass_form" :rules="pass_form_rules" ref="reset_pass_form" label-position="right">
      <el-form-item prop="password" label="新密码">
        <el-input v-model="reset_pass_form.password" type="password"
                  placeholder="请输入新密码" class="reset-form-input"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="绑定手机">
        <el-input v-model="reset_pass_form.phone" placeholder="请输入账号绑定的手机号" class="reset-form-input"></el-input>
      </el-form-item>
      <el-form-item prop="verify_code" label="验证码">
        <el-input v-model="reset_pass_form.verify_code" placeholder="请输入短信验证码" class="reset-form-input"></el-input>
      </el-form-item>
    </el-form>
    <div style="height: 100px">
      <el-button class="reset-form-btn" @click="sending_sms" type="primary">获取短信验证码</el-button>
      <el-button class="reset-form-btn" @click="submit_form" type="success">提交修改</el-button>
    </div>
  </div>
</template>

<script>
import {get_code_checker, get_max_length_checker, get_phone_checker, get_string_checker} from "@/utils/checker_util";
import {send, verify} from "@/api/sms_service";
import {update_pass} from "@/api/user_service";

export default {
  name: "reset-pass",
  props: {
    teacher_no: {
      type: String,
      default: ''
    }
  },
  data(){
    return {
      reset_pass_form: {
        teacher_no: '',
        password: '',
        phone: '',
        verify_code: '',
      },
      pass_form_rules: {
        password: [get_string_checker('请输入新密码'),get_max_length_checker('密码长度最大为16位')],
        phone: [{validator: get_phone_checker(), trigger: 'blur'},{required:true}],
        verify_code: [{validator: get_code_checker(), trigger: 'blur'},{required:true}]
      }
    }
  },
  methods: {
    sending_sms(){
      let phone = this.reset_pass_form.phone
      if (phone !== ''){
        if ((/^1[3456789]\d{9}$/.test(phone))){
          send(phone).then( () => {
            this.$message.success('已成功向手机号'+this.reset_pass_form.phone+'发送短信')
          }).catch( () => {} )
        }else {
          this.$message.warning('请输入正确的手机号码')
        }
      }else {
        this.$message.warning('请输入手机号码')
      }
    },
    submit_form(){
      this.reset_pass_form.teacher_no = this.teacher_no
      this.$refs.reset_pass_form.validate(valid => {
        if (valid){
          this.$fsloading.startLoading('正在提交修改...')
          // 验证短信验证码
          verify(this.reset_pass_form.phone,this.reset_pass_form.verify_code).then(() => {
            update_pass(this.reset_pass_form).then(() => {
              this.$fsloading.endLoading()
              this.$emit('success')
            }).catch(() => {
              this.$fsloading.endLoading()
            })
          }).catch(() => {
            this.$fsloading.endLoading()
          })
        }else {
          return false
        }
      })
    },
    clear_form(){
      this.$refs.reset_pass_form.resetFields()
    }
  }
}
</script>

<style scoped>

.reset-form-input{
  border-bottom: #1d8fff solid;
}

.reset-form-input:hover{
  border-bottom: #C2E5FF solid;
}

.reset-form-btn{
  margin-top: 20px;
}

</style>