<template>
  <div style="width: 100%;height: auto;display: block;" >
    <div style="width: 100%;height: 100px;margin-bottom: 20px;display: flex;background: #ffffff">
      <div style="width: 20%;margin-left: 20px;text-align: center; ">
        <div style="height: 60px;line-height: 60px;font-size: 20px;font-weight: bold">通知总数</div>
        <div style="height: 40px;line-height: 20px;font-size: 20px">{{student_info_meta_data.length}}(条)</div>
      </div>
      <div style="width: 80%;line-height: 100px">
        <div style="float: right">
          <el-button type="success" style="width: 140px;height: 50px;margin-right: 40px"
                     icon="el-icon-message-solid" @click="handle_drawer_open">发布通知</el-button>
        </div>
      </div>
    </div>
    <div style="width: 100%;height: 50px;margin-bottom: 20px;display: flex;">
      <div style="width: 200px;height: 50px;line-height: 50px;margin-right: 20px;">
        <el-select v-model="curr_nt_type" @change="handle_selector_change">
          <el-option
              v-for="item in nt_type_selection"
              :key="item.val"
              :label="item.label"
              :value="item.val">
          </el-option>
        </el-select>
      </div>
      <div style="width: auto;height: 50px;line-height: 50px;margin-right: 20px;display: flex">
        <div style="width: 160px;margin-right: 5px">
          <el-select v-model="search_type">
            <el-option
                v-for="item in search_selection"
                :key="item.val"
                :label="item.label"
                :value="item.val">
            </el-option>
          </el-select>
        </div>
        <div style="margin-right: 5px;width: 250px">
          <el-input placeholder="请输入搜索关键字" v-model="search_key" ></el-input>
        </div>
        <div>
          <el-button plain icon="el-icon-search" @click="handle_data_filter"></el-button>
        </div>
      </div>
      <div style="width: 120px;height: 50px;line-height: 50px">
        <el-button plain icon="el-icon-refresh"
                   @click="() => {this.table_render_data = this.student_info_meta_data}">重新加载</el-button>
      </div>
    </div>
    <div>
      <el-table :data="table_render_data" stripe  >
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column property="student_no" label="学号" width="200px"></el-table-column>
        <el-table-column property="name" label="姓名" width="150px"></el-table-column>
        <el-table-column property="gender" label="性别" width="50px"></el-table-column>
        <el-table-column property="class_name" label="班级"></el-table-column>
        <el-table-column property="contact" label="联系方式"></el-table-column>
        <el-table-column property="email" label="邮箱"></el-table-column>
        <el-table-column property="social_account" label="QQ账号"></el-table-column>
        <el-table-column label="操作">
          <el-button type="text" icon="el-icon-bell">发送通知</el-button>
          <el-button type="text" icon="el-icon-remove" class="member-remove-btn">移出班级</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <common-pagination></common-pagination>
    </div>
  </div>
</template>

<script>
import CommonPagination from "@/components/pagination";
import {mock_student_contact_data} from "@/utils/data_mock_util";
import {deeply_copy_obj} from "@/provider/common_provider";
export default {
  name: "index",
  components: {CommonPagination},
  data() {
    return {
      student_info_meta_data: mock_student_contact_data(10),
      table_render_data: deeply_copy_obj(mock_student_contact_data(10)),
    }
  },
  methods: {
    handle_drawer_open(){}
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