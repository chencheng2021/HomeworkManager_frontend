<template>
  <div class="class-item_wrapper" v-if="class_info_data.length > 0">
  <div v-for="item in class_info_data" :key="item.id">
    <el-card class="class-card_wrapper">
      <div class="class-info_content_wrapper" >
        <div class="class-info_wrapper">
          <div class="class-info-item_top">
            <div style="height: 50px;width: 50px;text-align: center">
              <i class="el-icon-school" style="font-size: 40px;margin-top: 5px"></i>
            </div>
            <div class="class-info-item-name">
              <label>{{item.name}}</label>
            </div>
          </div>
          <div class="class-info-item_full">
            <div class="class-info-item-operator">
              <el-button type="text" icon="el-icon-user"
                         @click="on_contact_click(item)"
                         style="font-size: 13px">班级成员</el-button>
            </div>
            <div class="class-info-item-operator">
              <el-button type="text"  icon="el-icon-edit" style="font-size: 13px"
              @click="edit_btn_handler(item)">编辑信息</el-button>
            </div>
            <div class="class-info-item-operator">
              <el-button type="text"  icon="el-icon-paperclip" style="font-size: 13px"
                         @click="class_files_list_handler(item)">班级文件</el-button>
            </div>
            <div class="class-info-item-operator" style="width: auto">
              <el-dropdown trigger="click">
              <span style="cursor: pointer;color: #409EFF">
                更多操作
              <i class="el-icon-setting"></i>
              </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button type="text" @click="members_import_btn_handler(item)">导入成员</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button type="text" @click="file_publish_handler(item)">发布文件</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-popconfirm title="确认删除该班级吗?" confirm-button-text="确认"
                                   @confirm="check_before_delete(item)"
                                   icon="el-icon-info" icon-color="red">
                      <el-button slot="reference" type="text" >删除班级</el-button>
                    </el-popconfirm>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
        <div class="class-info_wrapper" style="font-size: 14px">
          <div class="class-info-item_full">
            <div class="class-info-item-val">
              <label>班级编号</label>
            </div>
            <div class="class-info-item-val">
              <label>学生人数</label>
            </div>
            <div class="class-info-item-val">
              <label>创建时间</label>
            </div>
          </div>
          <div class="class-info-item_full">
            <div class="class-info-item-val">
              <label>{{item.class_code}}</label>
            </div>
            <div class="class-info-item-val">
              <label>{{item.total_student_num}}</label>
            </div>
            <div class="class-info-item-val">
              <label>{{item.create_date}}</label>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</div>
  <div v-else>
    <empty-data></empty-data>
  </div>
</template>

<script>

import EmptyData from "@/components/empty-data";
export default {
  name: "class-info-item",
  components: {EmptyData},
  props:{
    class_info_data:{
      type: Array,
      default: () => {
        return []
      }
    },
    dismiss_btn_handler:{
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
    contact_btn_handler:{
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
    },
    file_publish_handler: {
      type: Function,
      default: () => {
        console.error('files publish handler is not defined!')
      }
    }
  },
  data(){
    return{
      class_list_data: this.class_info_data
    }
  },
  methods:{
    check_before_delete(item){
      if (item.total_student_num > 0){
        this.$message.warning('已导入学生的班级目前不支持删除!')
      }else {
        this.dismiss_btn_handler(item)
      }
    },
    on_contact_click(item){
      if (item.member_data.length === 0){
        this.$message.info('该班级暂无学生加入，没有成员数据')
      }else {
        // 交由父组件去进行处理
        this.contact_btn_handler(item)
      }
    },
  }
}
</script>

<style scoped>

/deep/.el-button{
  font-size: 13px!important;
}

.class-item_wrapper{
  width: 100%;
  height: 800px;
  padding: 10px 0;
  overflow-y: scroll;
  overflow-x: hidden;
}

.class-card_wrapper{
  height: 140px;margin-top: 10px;
  width: 100%;
  display: block;
  transition: .2s;
  cursor: pointer;
}

.class-card_wrapper:hover{
  transform: translateY(-2px) translateX(2px);
}

.class-info_content_wrapper{
  display: flex;
  height: 100px;
  width: 100%;
}

.class-info_wrapper{
  width: 50%;
  height: 100%;
  cursor: pointer;
}

.class-info-item_top{
  display: flex;
  width: 80%;
  height: 50px;
}

.class-info-item_full{
  display: flex;
  width: 100%;
  height: 50px;
  text-align: center;
}

.class-info-item-name{
  height: 50px;
  line-height: 50px;
  width: auto;
  font-size: 25px;
  font-weight: bold;
}

.class-info-item-name:hover{
  color: #1d8fff;
}

.class-info-item-operator{
  height: 50px;
  line-height: 50px;
  width: auto;
  margin-right: 20px;
  color: #1d8fff;
}

.class-info-item-val{
  width: 25%;
  height: 50px;
  margin-right: 20px;
  line-height: 50px;
}

</style>