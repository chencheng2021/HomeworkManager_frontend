<template>
  <div id="header_wrapper">
    <div style="width: 40%;">
      <i class="el-icon-s-platform" style="margin-left: 20px;font-size: 25px;"></i>
      <label style="font-size: 20px;margin-left: 5px;color: #ffffff;">
        小学生作业推送管理系统-教师端
      </label>
    </div>
    <div style="width: 60%;">
      <div style="float:right;width: 300px">
        <label style="margin-right: 50px;font-size: 18px;color: #ffffff">
          {{time_desc}}<strong>陈城</strong>老师
        </label>
      </div>
    </div>
  </div>
</template>

<script>
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

</style>