<template>
  <el-upload action="" :on-exceed="() => {this.$message.warning('单次只能上传一个文件')}"
             :on-change="handle_change_when_importing"
             :on-remove="handle_remove_when_importing" :file-list="file_list_upload"
             :auto-upload="false"
             :limit="1" name="file"
             accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel">
    <el-button slot="trigger" type="primary"  round style="margin-right: 20px">选择文件</el-button>
    <el-popconfirm title="确定将以上学生都注册到班级中吗？" @confirm="handle_confirm_student_import">
      <el-button type="success" round slot="reference">确认导入</el-button>
    </el-popconfirm>
  </el-upload>
</template>

<script>
export default {
  name: "file-upload-btn"
}
</script>

<style scoped>

</style>