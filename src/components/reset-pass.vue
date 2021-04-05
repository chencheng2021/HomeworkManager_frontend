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

    },
    submit_form(){
      this.reset_pass_form.teacher_no = this.teacher_no
      this.$refs.reset_pass_form.validate(valid => {
        if (valid){
          console.log('')
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
  border-radius: 0;
  margin-top: 20px;
}

</style>