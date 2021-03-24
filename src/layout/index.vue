<template>
  <div id="layout">
    <el-container class="main-container">
      <el-header height="60px">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px" style="border-right:none ">
          <sidebar></sidebar>
        </el-aside>
        <el-container>
          <el-main class="main">
            <container></container>
          </el-main>
          <el-footer class="footer" height="50px">
            <Footer></Footer>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/layout/components/header";
import Footer from "@/layout/components/footer";
import Container from "@/layout/components/container";
import Sidebar from "@/layout/components/sidebar";
export default {
  name: "index",
  components: {Sidebar, Container, Footer, Header}
}
</script>

<style scoped>

#layout{
  height: 100%;
  width: 100%;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  padding: 0!important;
  color: #333;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  /*
      el-container中默认padding是20px，这里为了自定义布局，把它设置为0
  */
  padding: 0!important;
}
body > .el-container {
  margin-bottom: 40px;
}
/deep/.el-scrollbar__thumb {
  background-color: #333333;
  /*width: 150px;*/
}
/*
    用该样式可以隐藏el-main中所有滚动条
*/
.el-main::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
/deep/.el-scrollbar {
  height: 100%;
}
/deep/.el-scrollbar__wrap{
  overflow-x: auto;
}
.main-container{
  width: 100%;
  height: 100%;
}
.main{
  height: 100%;
}

</style>