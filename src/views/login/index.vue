<template>
  <div class="login-bk" >
    <!--两个底层背景色框-->
    <div style="display: flex;width: 100%;height: 100%;z-index: -100;position:absolute;">
      <div style="width: 25%;height: 100%;background: #39A2EF">
        <label style="color: #ffffff;font-size: 30px;margin-left: 40%;line-height: 80px">欢 迎 回 来 ~</label>
      </div>
      <div style="width: 75%;height: 100%;background: #C2E5FF "></div>
    </div>
    <div style="z-index:100;width:100%;height:100%;position: fixed">
      <!--登录窗的主体div-->
      <div class="content-card">
        <div style="width: 100%;height: 100%;display: flex">
          <!--第二层左侧框-->
          <div style="width: 35%;height: 100%;">
            <el-card shadow="none" :body-style="{padding:'0px'}"
                     style="width: 80%;height: 90%;margin-left: 10%;margin-top: 5%;border: 0;text-align: center;background: #FCFDFF">
              <div style="margin-top: 100px;margin-bottom: 50px"><label style="color: #1d82ff;font-size: 23px;">作业推送管理系统-教师端</label></div>
              <div style="margin-top: 30px;">
                <el-form :model="loginForm" status-icon ref="loginForm" label-position="right" :rules="login_form_rules">
                  <el-form-item prop="username" style="margin-bottom: 30px">
                    <el-card shadow="hover" :body-style="{padding:'0'}">
                      <el-input placeholder="教工号" type="text" v-model="loginForm.username" style="border-radius: 30px!important;">
                      <span slot="prefix">
                        <i class="el-icon-user" style="margin-top:16px;font-size: 18px;color: #1d82ff"></i>
                      </span>
                      </el-input>
                    </el-card>
                  </el-form-item>
                  <el-form-item prop="password" >
                    <el-card shadow="hover" :body-style="{padding:'0'}" >
                      <el-input v-model="loginForm.password" placeholder="登录密码"  type="password">
                        <span slot="prefix">
                            <i class="el-icon-lock" style="margin-top:16px;font-size: 18px;color: #1d82ff"></i>
                        </span>
                      </el-input>
                    </el-card>
                  </el-form-item>
                  <div style="width: 100%;height: 30px;display: flex;">
                    <div style="text-align: left;line-height: 30px;width: 50%;">
                      <el-checkbox v-model="rememberMe"
                                   @change="remember_user"
                                   style="font-size: 10px;color: #A6A7AD;">记住密码</el-checkbox>
                    </div>
                    <div style="text-align: right;font-size:14px;width: 50%;line-height: 30px;color: #A6A7AD;">
                      <span class="forget-pass-btn" @click="handle_pass_dialog_open">忘记密码</span>
                    </div>
                  </div>
                  <el-card shadow="hover" class="submit-btn" @click.native="submit_login">
                    <span> 登 录 <i class="el-icon-right"></i></span>
                  </el-card>
                </el-form>
              </div>
            </el-card>
          </div>
          <div :style="imgBkDivStyle"></div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="showResetPassDialog" center title="修改密码" width="500px">
      <reset-pass :teacher_no="loginForm.username" ref="reset_pass" @success="handle_pass_dialog_close"></reset-pass>
    </el-dialog>
  </div>
</template>

<script>
import {decrypt, encrypt} from "@/provider/common_provider";
import {get_string_checker} from "@/utils/checker_util";
import {obtain, save} from "@/provider/local_storage_provider";
import ResetPass from "@/components/reset-pass";
import {login} from "@/api/user_service";

const remember_key = 'UH4KJ5YKJ5AS6D6FK7JH7AE-US7AHD'

export default {
  name: "login",
  components: {ResetPass},
  created() {
    let remember_usr_str = obtain(remember_key)
    if (remember_usr_str){
      let remember_usr = JSON.parse(decrypt(remember_usr_str))
      this.loginForm.username = remember_usr.username
      this.loginForm.password = remember_usr.password
    }
  },
  data(){

    return{
      loginForm:{
        username:'',
        password:''
      },
      login_form_rules: {
        username: [
         get_string_checker('请输入教工号')
        ],
        password: [get_string_checker('请输入登录密码')]
      },
      rememberMe:false,
      imgBkDivStyle:{
        backgroundImage:'url(' + require('@/assets/images/img1.png') +')',
        backgroundSize:'fixed',
        width:'65%',
        height:'100%',
      },
      icon_bk_style:{
        backgroundImage: 'url(' + require('@/assets/images/img4.png') +')',
        backgroundSize: '100px',
        width: '100px',
        height: '100px',
      },
      showResetPassDialog:false,
    }
  },

  methods: {
    submit_login(){
      this.$refs.loginForm.validate(valid=>{
        if (valid){
          this.$fsloading.startLoading('登录验证中...')
          login(this.loginForm.username,this.loginForm.password).then( resp => {
            this.$fsloading.endLoading()
            let token = resp.token
            if (token){
              this.$store.dispatch( 'process_login', resp.theacher_info, token).then(() => {
                this.$fsloading.endLoading()
              })
            }
          }).catch( () =>{
            this.$fsloading.endLoading()
          })
        }else {
          return false
        }
      })
    },
    remember_user(){
      if (this.rememberMe){
        if (this.loginForm.username !== '' && this.loginForm.password !== ''){
          save(remember_key,encrypt(JSON.stringify(this.loginForm)))
        }
      }
    },
    handle_pass_dialog_open() {
      if (this.loginForm.username !== ''){
        this.showResetPassDialog = true
      }else{
        this.$message.warning('请先输入教工号')
      }
    },
    handle_pass_dialog_close(){
      this.$refs.reset_pass.clear_form()
      this.showResetPassDialog = false
    }
  }

}
</script>

<style scoped>


.login-bk{
  width: 100%;
  height: 100%;
/*  background: #665fee;
  background: -moz-linear-gradient(45deg, #665fee 0%, #27c2de 100%);
  background: -webkit-linear-gradient(45deg, #665fee 0%, #27c2de 100%);
  background: -o-linear-gradient(45deg, #665fee 0%, #27c2de 100%);
  background: linear-gradient(45deg, #665fee 0%, #27c2de 100%);*/
  /*background: #7FBEFE;*/





}

.content-card{
  width: 80%;height: 80%;margin-left: 10%;margin-top:5%;
  background:#FCFDFF;
  /*阴影效果*/
  /*box-shadow:0 1px 50px rgba(0,0,0,0.3),0 0 20px rgba(0,0,0,0.1)*/
}

/deep/.el-input__inner {
  background-color: transparent;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 0;
  border-radius: 0;
  height: 50px;
}

.forget-pass-btn:hover{
  color: #1d82ff;
  text-decoration: underline;
  cursor: pointer;
}

.submit-btn{
  border: 0;color: #ffffff;
  font-size: 17px;
  margin-top:10%;  background: #1d82ff;cursor: pointer
}

.submit-btn:hover{
  background: #1d8fff;
  box-shadow:0 1px 7px rgba(0,0,0,0.3),0 0 8px rgba(0,0,0,0.1);
}

.right-img-content{
  background: no-repeat center right;
  background-size: cover;
}

.to-register-btn{
  color: #1d82ff;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
}

</style>