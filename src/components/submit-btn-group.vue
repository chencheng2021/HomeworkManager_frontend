<template>
  <div style="width: 100%;height: auto;text-align: center;display: flex">
    <el-button type="primary" style="width: 120px">{{submit_btn_text}}</el-button>
    <el-button type="info" plain style="width: 120px">{{cancel_btn_text}}</el-button>
  </div>
</template>

<script>
export default {
  name: "submit-btn-group",
  props: {
    submit_btn_text: {
      type: String,
      default: '提交'
    },
    cancel_btn_text: {
      type: String,
      default: '取消'
    },
    submit_handler: {
      type: Function,
      default: () => {
        // 如果未定义提交处理器，那么进行弹窗提示
        alert('An error occurred during submission: submit handler is undefined！')
      }
    },
    father_component: {
      type: Object,
      default: () => {
        console.error('Father component instance object is undefined!')
      }
    },
    form_name: {
      type: String,
      default: ''
    },
  },
  created() {

  },
  data() {
    return {

    }
  },
  methods: {
    do_submit(){
      let form = {
        id: 102,
        name: 'test'
      }
      this.submit_handler(form)
    }
  }

}
</script>

<style scoped>

</style>