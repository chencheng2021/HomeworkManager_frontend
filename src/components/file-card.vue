<template>
  <div style="cursor: pointer" v-if="file_data_list.length > 0">
    <template v-for="item in file_data_list" >
      <el-card shadow="hover" style="align-content: center;margin-bottom: 20px" :key="item.id">
        <i class="el-icon-paperclip"></i>
        <label>{{item.name}}</label>
        <div style="float: right;">
          <el-tooltip content="点击下载文件" placement="top">
            <el-button type="success" icon="el-icon-download" circle
                       size="mini" @click="jump_out(item.url)"></el-button>
          </el-tooltip>
        </div>
      </el-card>
    </template>
  </div>
  <div v-else style="text-align: center">
    <label>还未发布或上传任何班级文件</label>
  </div>
</template>

<script>
import {link_jumping} from "@/provider/common_provider";

export default {
  name: "file-card",
  props: {
    file_data_list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    jump_out(link){
      link_jumping(link)
    }
  }
}
</script>

<style scoped>

</style>