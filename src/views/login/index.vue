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
                     style="width: 80%;height: 90%;margin-left: 10%;margin-top: 5%;border: 0;text-align: center;background: #FAFDFF">
              <div style="margin-top: 100px;margin-bottom: 50px"><label style="color: #1d82ff;font-size: 23px;">作业推送管理系统-教师端</label></div>
              <div style="margin-top: 30px;">
                <el-form :model="loginForm" status-icon ref="loginForm" label-position="right" >
                  <el-form-item prop="email" style="margin-bottom: 30px">
                    <el-card shadow="hover" :body-style="{padding:'0'}">
                      <el-input placeholder="教工号" type="text" v-model="loginForm.email">
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
                                   style="font-size: 10px;color: #A6A7AD;">记住密码</el-checkbox>
                    </div>
                    <div style="text-align: right;font-size:14px;width: 50%;line-height: 30px;color: #A6A7AD;">
                      <span class="forget-pass-btn" >忘记密码</span>
                    </div>
                  </div>
                  <el-card shadow="hover" class="submit-btn">
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



  </div>
</template>

<script>
export default {
name: "index",
  data(){

    return{
      loginForm:{
        email:'',
        password:''
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
      loading:false,
    }
  },


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
  background: #FAFDFF;
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