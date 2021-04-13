<template>
  <div style="height: 1000px;background-color: #EBEEF5;display: contents">
    <div style="height: 100%">
      <el-card shadow="always" style="width: 80%;height: 80%;margin-top: 50px;margin-left: 10%">
        <el-table :data="student_table_render_data"  stripe width="700px">
          <el-table-column property="student_no" label="学号" ></el-table-column>
          <el-table-column property="name" label="姓名" ></el-table-column>
          <el-table-column property="gender" label="性别" >
            <template slot-scope="scope">
              <label v-if="scope.row.gender === 1">男</label>
              <label v-else>女</label>
            </template>
          </el-table-column>
          <el-table-column property="class_name" label="班级"></el-table-column>
          <el-table-column property="contact" label="联系方式"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="open_dialog(scope.row)">选课</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <el-dialog title="可选课程" center width="500px" :visible.sync="open_course_dialog" @close="close_dialog">
      <el-table :data="selectable_course_render_data"
                stripe ref="course_selection_tb" @selection-change="handle_course_election">
        <el-table-column type="selection" width="45" ></el-table-column>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column property="course_name" label="课程名称"></el-table-column>
        <el-table-column property="class_time" label="上课时间"></el-table-column>
      </el-table>
      <div style="margin-top: 30px;text-align: center">
        <el-button type="success" round style="width: 120px" @click="submit_course_selection">提交选课</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {get_all_students,} from "@/api/member_service";
import {get_selectable_course, selecting_course} from "@/api/course_service";

export default {
  name: "course-election",
  created() {
    this.$fsloading.startLoading('正在加载数据...')
    get_all_students().then((data) => {
      this.student_table_render_data = data
      this.$fsloading.endLoading()
    }).catch(() => {this.$fsloading.endLoading()})
  },
  data() {
    return {
      student_table_render_data: [],
      selectable_course_render_data: [],
      open_course_dialog: false,
      curr_selected_student_no: 0,
      selected_cache: [],
      selected_course: []
    }
  },
  methods:{
    open_dialog(item){
      // 保存当前已选中的学号
      this.curr_selected_student_no = item.student_no
      this.$fsloading.startLoading('正在加载数据...')
      get_selectable_course(item.student_no).then((data) => {
        this.selectable_course_render_data = data
        this.open_course_dialog = true;
        this.$fsloading.endLoading()
      }).catch(() => {
        this.$fsloading.endLoading()
      })
    },
    close_dialog(){
      // 清空已选缓存
      this.$refs.course_selection_tb.clearSelection()
      this.selected_course = []
      this.open_course_dialog = false
    },
    handle_course_election(item){
      this.selected_cache = item
    },
    submit_course_selection(){
      if (this.selected_cache.length > 0){
        this.selected_cache.forEach(course => {
          let record = {
            courseId: course.course_id,
            studentNo: this.curr_selected_student_no
          }
          this.selected_course.push(record)
        })
        this.$fsloading.startLoading('正在提交选课...')
        selecting_course(this.selected_course).then(() => {
          this.$fsloading.endLoading()
          this.close_dialog()
          this.$message.success('学生选课成功')
        }).catch(() => {this.$fsloading.endLoading()})
      }else {
        this.$message.warning('请至少选择一门课再提交');
      }
    }
  }
}
</script>

<style scoped>

/*使表头标题居中*/
/deep/.el-table th{
  text-align: center;
}

/*使表格内容居中*/
/deep/.el-table td{
  text-align: center;
}

</style>