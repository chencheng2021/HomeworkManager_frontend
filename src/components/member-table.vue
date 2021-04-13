<template>
  <div>
    <!--    多选操作模式下的表格需要有固定的高度，该属性无法动态渲染，因此只能使用v-if-->
    <el-table :data="table_render_data" stripe v-if="selection_mode"
              ref="selection_table" height="500"
              @selection-change="selection_change_handler">
      <!-- 开启表格的selection模式，提供多选操作 -->
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column property="student_name" label="学生姓名" v-if="member_type === 'parent'"></el-table-column>
      <el-table-column property="parent_name" label="家长姓名" v-if="member_type === 'parent'"></el-table-column>
      <el-table-column label="关系" v-if="member_type === 'parent'">
        <template slot-scope="scope">
          <label v-if="scope.row.gender === 1">父亲</label>
          <label v-else>母亲</label>
        </template>
      </el-table-column>
      <el-table-column property="contact" label="联系方式" v-if="member_type === 'parent' "></el-table-column>

      <el-table-column property="class_code" label="班级编号" v-if="member_type === 'class'"></el-table-column>
      <el-table-column property="class_name" label="班级名称" v-if="member_type === 'class'"></el-table-column>
      <el-table-column property="total_student_num" label="班级总人数" v-if="member_type === 'class'"></el-table-column>

      <el-table-column property="student_no" label="学号" width="200px" v-if="member_type === 'student'"></el-table-column>
      <el-table-column property="name" label="姓名" width="150px" v-if="member_type === 'student' "></el-table-column>
      <el-table-column label="性别" width="50px" v-if="member_type === 'student'">
        <template slot-scope="scope">
          <label v-if="scope.row.gender === 1">男</label>
          <label v-else>女</label>
        </template>
      </el-table-column>
      <el-table-column property="class_name" label="班级" v-if="member_type === 'student'"></el-table-column>
      <el-table-column property="contact" label="联系方式" v-if="member_type === 'student' "></el-table-column>

    </el-table>

    <el-table :data="table_render_data" stripe v-else
              ref="selection_table"
              @selection-change="selection_change_handler">
      <!-- 开启表格的selection模式，提供多选操作 -->
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column property="studentNo" label="学号" width="200px"></el-table-column>
      <el-table-column property="name" label="姓名" width="150px"></el-table-column>
      <el-table-column label="性别" width="50px">
        <template slot-scope="scope">
          <label v-if="scope.row.gender === 1">男</label>
          <label v-else>女</label>
        </template>
      </el-table-column>
      <el-table-column property="className" label="班级"></el-table-column>
      <el-table-column property="contact" label="联系方式"></el-table-column>
      <el-table-column property="email" label="邮箱"></el-table-column>
      <el-table-column property="socialAccount" label="QQ账号"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-bell" @click="publish_nt_handler(scope.row)" style="margin-right: 10px">发送通知</el-button>
          <el-popconfirm confirm-button-text="确认"
                         cancel-button-text="取消"
                         title="确认将该生移除班级吗？"
                         @confirm="remove_member_handler(scope.row)"
                         icon="el-icon-info" icon-color="red">
            <el-button type="text" icon="el-icon-delete" class="member-remove-btn" slot="reference">移出班级</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "member-table",
  props: {
    member_type:{
      type: String,
      default: "student"
    },
    table_render_data: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 表格是否提供多选框
    selection_mode: {
      type: Boolean,
      default: false
    },
    selection_change_handler: {
      type: Function,
      default: () => {
        //console.log('do nothing...')
      }
    },
    publish_nt_handler: {
      type: Function,
      default: () => {}
    },
    remove_member_handler: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    clear_selection(){
      this.$refs.selection_table.clearSelection()
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

.member-remove-btn{
  color: #F56C6C
}
.member-remove-btn:hover{
  color: red;
}

</style>