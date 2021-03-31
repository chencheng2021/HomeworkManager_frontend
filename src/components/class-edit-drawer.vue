<template>
  <div style="padding-top: 50px">
    <div style="margin-bottom: 100px">
      <el-form :model="class_data_form" ref="class_data_form"
               :rules="class_form_rules" status-icon label-width="120px"
               label-position="right">
        <el-form-item label="班级名称" prop="name" >
          <el-input v-model="class_data_form.name" placeholder="请输入班级名称"></el-input>
        </el-form-item>
        <el-form-item label="班级编号" prop="class_code">
          <el-input v-model="class_data_form.class_code" placeholder="请输入班级编号"></el-input>
        </el-form-item>
        <el-form-item label="班主任">
          <el-input value="Vinfer" disabled></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-divider></el-divider>
    <div class="class-info-form-submit-btn_wrapper">
      <el-button type="primary" style="width: 120px" @click="check_before_submit">
        提交
      </el-button>
      <el-button type="info" plain style="width: 120px" @click="reset_form">取消</el-button>
    </div>
  </div>
</template>

<script>
import {
  get_default_name_checker,
  get_max_length_checker,
  get_min_length_checker,
  get_string_checker
} from "@/utils/checker_util";
import {form_clear} from "@/provider/common_provider";

export default {
  name: "class-edit-drawer",
  props:{
    form_submit_handler:{
      type: Function,
      default: () => {
        console.error('form submit handler is not defined!')
      }
    }
  },
  data(){
    return{
      class_data_form:{
        id: 0,
        name: '',
        class_code: '',
        header_teacher_no: ''
      },
      class_form_rules:{
        name:[
          get_default_name_checker(),
          get_max_length_checker(16)
        ],
        class_code: [
            get_string_checker('班级编号不能为空'),
            get_min_length_checker(4),
            get_max_length_checker(16)
        ]
      },
      is_create_mode: true
    }
  },
  methods:{
    reset_form(){
      form_clear(this,'class_data_form')
    },
    check_before_submit(){
      // 每次提交表单前都需要将mode修改为创建模式
      this.$refs['class_data_form'].validate(valid => {
        if (valid){
          // 当前表单需要先在当前组件进行数据校验才可以提交给父组件进行最终的提交操作
          // 父组件无法对表单数据进行校验，因为该校验需要使用this来获取form对象
          this.form_submit_handler(this.class_data_form,this.is_create_mode)
          // 每次提交完表单后都必须将mode重置
          this.is_create_mode = true
        }else {
          return false
        }
      })
    },
    do_form_checking(){
      this.$refs['class_data_form'].validate(valid => {
        return valid
      })
    },
    on_edit_call(data){
      // 监听父组件的调用
      this.class_data_form.name = data.name
      this.class_data_form.id = data.id
      this.class_data_form.class_code = data.class_code
      // 此时是对数据进行修改，因此需要修改is_create_mode
      this.is_create_mode = false
    },
  }
}
</script>

<style scoped>

.class-info-form-submit-btn_wrapper{
  margin-top: 30px;
  width: 100%;
  height: 150px;
  text-align: center;
  line-height: 150px;
}

</style>