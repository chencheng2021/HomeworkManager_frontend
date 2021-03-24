<template>
  <div id="main-view-container" v-show="true">
    <transition name="el-fade-in" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
name: "container"
}
</script>

<style scoped>

#main-view-container{
  margin: 1% 1% 100px 1%!important;
  width:98%;
  height: auto;
}

</style>