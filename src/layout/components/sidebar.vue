<template>
  <div id="slideBar">
    <div class='wrapper'>
      <el-scrollbar class="scrollbar">
        <!--
            由于使用了自定义的菜单项渲染方式，因此目前还没找到
            很好解决左侧菜单栏折叠收缩的解决方法
            目前可以实现该功能，但是由于不美观因此不使用
        -->
        <el-menu
            :default-active="this.$route.path"
            background-color="#F2F6FC"
            text-color="#303133"
            active-text-color="#000000"
            style="width:100%"
            :router="router_switch">
          <side-bar-item :routes="all_routes"></side-bar-item>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>



import SideBarItem from "@/layout/components/sidebar-item";
export default {
name: "sidebar",
  components: {SideBarItem},
  data(){
    return{
      router_switch:true,
      all_routes:this.$router.options.routes,
    }
  }
}
</script>

<style scoped>

#slideBar{
  width: 100%;
  height: 100%;
  background-color:#F2F6FC;
}

.scrollbar{
  height: 100%;
  width: auto;
  overflow-x: hidden;
}

/**
    加该样式解决了鼠标指针放到scrollbar上会出现横向滚动条的问题
*/
/deep/.is-horizontal{
  display: none;
}

/*
    加该样式可以解决横向滚动条一致会显示的问题
*/
/deep/.el-scrollbar__wrap{
  overflow-x: hidden!important;
}

.el-scrollbar__wrap::-webkit-scrollbar{
  display: none;
}

/*
    颜色设置不生效就加!important
*/
/deep/.el-scrollbar__thumb {
  background-color:#ffffff!important;
}

/deep/.el-menu-item.is-active{
  background:rgba(0,0,0,0.1)!important;
  /*
      opacity是设置整体透明的，文字也会跟着一起变透明，即整个父级元素下所有子元素都会一起透明
      而rgba的方式则是仅仅只设置背景透明
  */
  /* opacity: 0.8;*/
}

/deep/.el-menu-item:hover{
  background: rgba(0,0,0,0.1)!important;
}

.wrapper{
  width: inherit;
  height:100%;
  background-color: #F2F6FC;
}

</style>