<template>
  <div style="padding-top: 50px">
    <div style="margin-bottom: 100px">
      <el-form :model="course_data_form" ref="course_data_form"
               :rules="course_form_rules" status-icon label-width="120px"
               label-position="right">
        <el-form-item label="课程名称" prop="name" >
          <el-input v-model="course_data_form.name" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item label="上课时间" prop="class_time">
          <el-input v-model="course_data_form.class_time" placeholder="请输入课程上课时间"></el-input>
        </el-form-item>
        <el-form-item label="课程学分" prop="credit" >
          <!--使用数值校验时，需要使用v-model.number来进行绑定-->
          <el-input v-model.number="course_data_form.credit"  disabled></el-input>
        </el-form-item>
        <el-form-item label="课程周期(周)" prop="course_period">
          <el-input v-model="course_data_form.course_period"  placeholder="请输入课程上课周期（数值）"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-divider></el-divider>
    <div class="course-info-form-submit-btn_wrapper">
      <el-button type="primary" style="width: 120px" @click="check_before_submit">提交</el-button>
      <el-button type="info" plain style="width: 120px" @click="reset_form">取消</el-button>
    </div>
  </div>
</template>

<script>
import {
  get_default_name_checker, get_default_number_checker,
  get_max_length_checker,
  get_string_checker
} from "@/utils/checker_util";
import {form_clear} from "@/provider/common_provider";

export default {
  name: "course-edit-drawer",
  props:{
    form_submit_handler:{
      type: Function,
      default: () => {
        alert('form submit handler is not defined!')
      }
    }
  },
  data(){
    return{
      course_data_form:{
        id: 0,
        name: '',
        credit: 0,
        class_time: '',
        course_period: 10
      },
      course_form_rules:{
        name: [
          get_default_name_checker(),
          get_max_length_checker(16)
        ],
        credit: get_default_number_checker(),
        class_time: [
            get_string_checker('上课时间不能为空'),
            get_max_length_checker('32'),
        ],
        course_period: get_default_number_checker(),
      },
      is_create_mode: true
    }
  },
  methods:{
    reset_form(){
      form_clear(this,'course_data_form')
      this.$emit('close')
    },
    check_before_submit(){
      // 每次提交表单前都需要将mode修改为创建模式
      this.$refs['course_data_form'].validate(valid => {
        if (valid){
          // 当前表单需要先在当前组件进行数据校验才可以提交给父组件进行最终的提交操作
          // 父组件无法对表单数据进行校验，因为该校验需要使用this来获取form对象
          this.form_submit_handler(this.course_data_form,this.is_create_mode)
          // 每次提交完表单后都必须将mode重置
          this.is_create_mode = true
        }else {
          return false
        }
      })
    },
    do_form_checking(){
      this.$refs['course_data_form'].validate(valid => {
        return valid;
      })
    },
    on_edit_call(data){
      // 监听父组件的调用
      this.course_data_form.name = data.name
      this.course_data_form.id = data.id
      this.course_data_form.class_time = data.class_time
      this.course_data_form.credit = data.credit
      this.course_data_form.course_period = data.course_period
      // 此时是对数据进行修改，因此需要修改is_create_mode
      this.is_create_mode = false
    },
  }
}
</script>

<style scoped>

.course-info-form-submit-btn_wrapper{
  margin-top: 30px;
  width: 100%;
  height: 150px;
  text-align: center;
  line-height: 150px;
}

</style>