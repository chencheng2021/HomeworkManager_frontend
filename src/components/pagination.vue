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
  data(){
    return {
      page_size: 10,
      current_page: 1,
      total: 0
    }
  },
  methods: {
    handle_size_change(size){
      this.page_size = size
      this.$emit('load-page',this.page_size,this.current_page)
    },
    handle_current_change(page){
      this.current_page = page
      this.$emit('load-page',this.page_size,this.current_page)
    },
    init_total(total){
      this.total = total
    }
  }
}
</script>

<style scoped>

</style>