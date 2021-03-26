<template>
  <div style="width: 100%;height: auto;padding: 10px 0;text-align: center;margin-top: 10px">
    <el-pagination
        @size-change="handle_size_change"
        @current-change="handle_current_change"
        :current-page="current_page"
        :page-sizes="[10,30, 50, 100]"
        :page-size="page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "common-pagination",
  props: {
    // 加载分页数据的接口url
    loaded_url: {
      type: String,
      default: '',
    }
  },
  data(){
    return {
      page_size: 10,
      current_page: 1,
      total: 1000
    }
  },
  methods: {
    handle_size_change(size){
      this.$message.info('切换分页大小为：'+size)
    },
    handle_current_change(page){
      this.$message.info('跳转到第'+page+'页')
    }
  }
}
</script>

<style scoped>

</style>