<template>
  <div class="course-item_wrapper">
    <div v-for="item in course_list_data" :key="item.id">
      <el-card class="course-card_wrapper">
        <div class="course-info_content_wrapper">
          <div class="course-info_wrapper">
            <div class="course-info-item_top">
              <div style="height: 50px;width: 50px;text-align: center">
                <i class="el-icon-reading" style="font-size: 40px;margin-top: 5px"></i>
              </div>
              <div class="course-info-item-name">
                <label>{{item.name}}</label>
              </div>
            </div>
            <div class="course-info-item_full">
              <div class="course-info-item-operator">
                <el-button type="text" icon="el-icon-document-checked"
                           @click="on_contact_click(item)"
                           style="font-size: 13px">选课信息</el-button>
              </div>
              <div class="course-info-item-operator">
                <el-button type="text"  icon="el-icon-edit" style="font-size: 13px"
                           @click="edit_btn_handler(item)">编辑信息</el-button>
              </div>
              <div class="course-info-item-operator">
                <el-button type="text"  icon="el-icon-paperclip" style="font-size: 13px"
                           @click="class_files_list_handler(item)">课程文件</el-button>
              </div>
              <div class="course-info-item-operator" style="width: auto">
                <el-dropdown trigger="click">
              <span style="cursor: pointer;color: #409EFF">
                更多操作
              <i class="el-icon-setting"></i>
              </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <el-button type="text" @click="members_import_btn_handler">发布作业</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button type="text">发布文件</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button type="text" @click="check_before_delete(item)">删除课程</el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>
          <div class="course-info_wrapper" style="font-size: 14px">
            <div class="course-info-item_full">
              <div class="course-info-item-val">
                <label>课程学分</label>
              </div>
              <div class="course-info-item-val">
                <label>上课时间</label>
              </div>
              <div class="course-info-item-val">
                <label>课程周期</label>
              </div>
            </div>
            <div class="course-info-item_full">
              <div class="course-info-item-val">
                <label>{{item.credit}}</label>
              </div>
              <div class="course-info-item-val">
                <label>{{item.class_time}}</label>
              </div>
              <div class="course-info-item-val">
                <label>{{item.course_period}}周</label>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>

export default {
  name: "course-info-item",
  props:{
    course_info_data:{
      type: Array,
      default: () => {
        return []
      }
    },
    delete_btn_handler:{
      type: Function,
      default: () => {
        console.error('dismiss handler is not defined!')
      }
    },
    edit_btn_handler:{
      type: Function,
      default: () => {
        console.error('edit handler is not defined!')
      }
    },
    course_table_btn_handler:{
      type: Function,
      default: () => {
        console.error('contact handler is not defined!')
      }
    },
    members_import_btn_handler:{
      type: Function,
      default: () => {
        console.error('members import handler is not defined!')
      }
    },
    class_files_list_handler:{
      type: Function,
      default: () => {
        console.error('files list handler is not defined!')
      }
    }
  },
  data(){
    return{
      course_list_data: this.course_info_data
    }
  },
  methods:{
    check_before_delete(item){
      if (item.total_student_num > 0){
        this.$message.warning('已导入学生的班级目前不支持删除!')
      }else {
        this.delete_btn_handler(item)
      }
    },
    on_contact_click(item){
      if (item.total_student_num === 0){
        this.$message.info('该班级暂无学生加入，没有成员数据')
      }else {
        // 交由父组件去进行处理
        this.course_table_btn_handler(item)
      }
    },
  }
}
</script>

<style scoped>

/deep/.el-button{
  font-size: 13px!important;
}

.course-item_wrapper{
  width: 100%;
  height: 800px;
  padding: 10px 0;
  overflow-y: scroll;
  overflow-x: hidden;
}

.course-card_wrapper{
  height: 140px;margin-top: 10px;
  width: 100%;
  display: block;
  transition: .2s;
  cursor: pointer;
}

.course-card_wrapper:hover{
  transform: translateY(-2px) translateX(2px);
}

.course-info_content_wrapper{
  display: flex;
  height: 100px;
  width: 100%;
}

.course-info_wrapper{
  width: 50%;
  height: 100%;
  cursor: pointer;
}

.course-info-item_top{
  display: flex;
  width: 80%;
  height: 50px;
}

.course-info-item_full{
  display: flex;
  width: 100%;
  height: 50px;
  text-align: center;
}

.course-info-item-name{
  height: 50px;
  line-height: 50px;
  width: auto;
  font-size: 25px;
  font-weight: bold;
}

.course-info-item-name:hover{
  color: #1d8fff;
}

.course-info-item-operator{
  height: 50px;
  line-height: 50px;
  width: auto;
  margin-right: 20px;
  color: #1d8fff;
}

.course-info-item-val{
  width: 30%;
  height: 50px;
  margin-right: 20px;
  line-height: 50px;
}

</style>