<template>
  <div style="cursor: pointer">
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