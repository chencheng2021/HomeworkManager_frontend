<template>
  <transition name="el-zoom-in-center" mode="out-in">
    <router-view />
  </transition>
</template>

<script>


export default {
  name: 'App',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap');
html,body{
  /*font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;*/

  font-family: 'Noto Sans SC', sans-serif;
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0;
  /*外部间距也是如此设置*/
  margin: 0;
  /*统一设置高度为100%*/
  height: 100%;
  width: 100%;
  /*全局禁用html元素中的文本复制（输入框内的不会被禁）*/
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

}

/* 定义滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;

}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
  border-radius: 10px;
  /*background-color: #2BC0E4;*/
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 0 rgba(240, 240, 240, .5);
  background-color: #999999;
}

/*
  transition中过度效果时间设置
  需要使用mode=out-in
*/
.v-enter-active,
.v-leave-active{
  transition: all 0.5s ease;
}
</style>
