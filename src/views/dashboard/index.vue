<template>
  <div style="width: 100%;height: auto;">
    <div style="width: 100%;height: 200px;margin-bottom: 20px;display: flex;text-align: center">
      <el-card shadow="hover" class="dashboard-top-info">
        <div class="dashboard-top-info-item" style="color: #409EFF">
          <i class="el-icon-date" style="margin-right: 5px"></i>
          <label>已创建备忘数量</label>
        </div>
        <div class="dashboard-top-info-item" style="line-height: 50px">
          <strong><label>{{memo_collections.length}} 条</label></strong>
        </div>
      </el-card>
      <el-card shadow="hover" class="dashboard-top-info">
        <div class="dashboard-top-info-item" style="color: #E6A23C">
          <i class="el-icon-edit-outline" style="margin-right: 5px"></i>
          <label>待完成备忘</label>
        </div>
        <div class="dashboard-top-info-item" style="line-height: 50px">
          <strong><label>{{unchecked_count}} 条</label></strong>
        </div>
      </el-card>
      <el-card shadow="hover" class="dashboard-top-info">
        <div class="dashboard-top-info-item" style="color: #67C23A">
          <i class="el-icon-document-checked" style="margin-right: 5px"></i>
          <label>已完成备忘</label>
        </div>
        <div class="dashboard-top-info-item" style="line-height: 50px">
          <strong><label>{{checked_count}} 条</label></strong>
        </div>
      </el-card>
      <div class="dashboard-top-time">
        <strong>{{now_hour}} : {{now_min}} : {{now_sec}} | 星期{{now_week_day}}</strong>
      </div>
    </div>
    <div style="width: 100%;height: 510px;display: flex;">
      <div style="width: 50%;padding: 0 10px;background-color: #ffffff">
        <div style="height: 60px;line-height: 60px;text-align: left;width:100%;border-bottom: #F2F6FC solid ">
          <label>本 地 备 忘 录</label>
          <div style="float: right;width: 300px">
            <el-button type="primary" plain style="width: 120px;margin-left: 10px"
                       @click="open_memo_dialog"
                       icon="el-icon-circle-plus">添加备忘</el-button>
            <el-button type="success" plain style="width: 150px;"
                       icon="el-icon-delete" @click="clear_checked_memo">清除已完成</el-button>
          </div>
        </div>
        <div style="height: 440px;width: 100%;overflow-y: scroll;overflow-x: hidden">
          <div style="margin-top: 10px;" v-for="memo in memo_collections" :key="memo.id">
            <el-card shadow="hover" class="memo-item" :style="memo.checked ? checked_bk : unchecked_bk">
              <el-checkbox v-model="memo.checked" style="width:70%;overflow-x: scroll;" @change="handle_memo_checked(memo)">{{memo.content}}</el-checkbox>
              <div style="float: right;width: auto">
                <label>{{memo.date}}</label>
              </div>
            </el-card>
          </div>
        </div>
      </div>
      <div style="width: 49%;padding: 0 10px;height: inherit;overflow-y: scroll;margin-left: 10px;background-color: #ffffff">
        <el-calendar :v-model="new Date()"></el-calendar>
      </div>
    </div>
    <el-dialog title="新建备忘" width="500px" center :visible.sync="memo_dialog_open" @close="clear_memo_form">
      <el-form :model="memo_form" :rules="memo_form_rules" ref="memo_form" >
        <el-form-item label="备忘内容" prop="content">
          <el-input v-model="memo_form.content"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-top: 20px;text-align: center">
        <el-button type="primary" round @click="create_memo">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {get_max_length_checker, get_string_checker} from "@/utils/checker_util";
import {obtain_collect, remove_collect_item, save_collect, save_collect_item} from "@/provider/local_storage_provider";

const collect_name = 'memo_collections'

export default {
  name: "dashboard",

  created() {
    this.now_times()
    this.memo_collections = obtain_collect(collect_name)
    let checked_num = 0
    this.memo_collections.forEach(item=>{
      if (item.checked){
        checked_num++
      }
    })
    this.checked_count = checked_num
    this.unchecked_count = this.memo_collections.length - checked_num
  },
  data() {
    return {
      memo_collections: [],
      checked: false,
      unchecked_bk: {
        backgroundColor: '#d9ecff'
      },
      checked_bk:{
        backgroundColor: '#E1F3D8'
      },
      memo_form:{
        key: 0,
        content: '',
        checked: false,
        date: ''
      },
      memo_form_rules:{
        content: [
            get_string_checker('请输入备忘内容'),
            get_max_length_checker(32)
        ]
      },
      memo_dialog_open: false,
      now_time: '',
      now_hour: '',
      now_min: '',
      now_sec: '',
      now_week_day: '',
      checked_count: 0,
      unchecked_count: 0
    }
  },
  methods: {
    open_memo_dialog(){
      this.memo_dialog_open = true
    },
    create_memo(){
      this.$refs.memo_form.validate( valid => {
        if (valid){
          this.memo_form.key = String(new Date().getTime())
          // todo 这里要将日期格式化为 YY-MM-DD HH:mm
          this.memo_form.date = this.time_format(new Date().getTime(),true)
          // 保存到localstorage
          save_collect(collect_name,this.memo_form)
          // 添加到渲染数据中
          this.memo_collections = obtain_collect(collect_name)
          this.unchecked_count++
          this.memo_dialog_open = false
          this.$message.success('已成功添加备忘')
        }else {
          return false
        }
      })
    },
    clear_memo_form(){
      this.$refs.memo_form.resetFields()
    },
    handle_memo_checked(item){
      save_collect_item(collect_name,item)
      if (item.checked){
        this.checked_count++
        this.unchecked_count--;
      }else {
        this.checked_count--
        this.unchecked_count++;
      }
    },
    clear_checked_memo(){
      this.memo_collections.forEach( memo => {
        if (memo.checked){
          remove_collect_item(collect_name,memo.key)
        }
      })
      this.memo_collections = obtain_collect(collect_name)
    },
    time_format(timeStamp,transform_date) {
      let date = new Date(timeStamp)
      let hh =date.getHours() < 10? "0" + date.getHours(): date.getHours();
      let mm =date.getMinutes() < 10? "0" + date.getMinutes(): date.getMinutes();
      let ss =date.getSeconds() < 10? "0" + date.getSeconds(): date.getSeconds();
      this.now_hour = hh
      this.now_min = mm
      this.now_sec =ss
      this.now_week_day = this.get_week_day(date.getDay())
      if (transform_date){
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        return year + '-' + month + '-' + day + ' ' + hh + ':' + mm
      }
    },
    get_week_day(day_order){
      switch (day_order) {
        case 0: return '日'
        case 1: return '一'
        case 2: return '二'
        case 3: return '三'
        case 4: return '四'
        case 5: return '五'
        case 6: return '六'
      }
    },
    now_times(){
      this.time_format(new Date());
      setInterval(this.now_times,1000);
      this.clear()
    },
    clear(){
      clearInterval(this.now_times)
      this.now_times = null;
    },
  }
}
</script>

<style scoped>

.dashboard-top-info{
  width: 20%;margin-right: 20px;height: inherit;background-color: #ffffff;
  cursor: pointer;
}

.dashboard-top-info-item{
  font-size: 25px;height: 100px;line-height: 100px
}

.dashboard-top-time{
  float:right;flex-grow: 1;background-color: #ffffff;height: 200px;line-height: 200px;font-size: 50px;text-align: center;
  cursor: pointer;
}

.memo-item{
  width: 100%;height: 60px;
  border-radius: 0;
}

</style>