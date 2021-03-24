<template>
    <div>
        <template v-for="item in routes">
            <template v-if="!item.hidden&&item.children">
                <!--当当前路的子路由仅有一个路由时，那么当前路由只有一层的菜单结构-->
                <el-menu-item
                        v-if="hasOneShowingChildren(item.children) && !item.children[0].children" :to="item.path+'/'+item.children[0].path"
                        :key="item.children[0].name"
                        :index="item.path+'/'+item.children[0].path">
                    <i v-if="item.children[0].meta&&item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
                    <span v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
                </el-menu-item>

                <el-submenu v-else :index="item.name||item.path" :key="item.name">

                    <template slot="title">
                        <i  :class="item.meta.icon"></i>
                        <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
                    </template>

                    <template v-for="child in item.children">
                        <!--当当前路由存在子路由时，此时遍历第二层菜单-->
                        <template v-if="!child.hidden">
                            <!--当子路由还有子路由时，即3层菜单结构，那么递归遍历-->
                            <side-bar-item  v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></side-bar-item>
                            <!--如果已经没有子路由了，那么只有2层菜单结构，直接遍历完当前子路由-->
                            <el-menu-item
                                    v-else :to="item.path+'/'+child.path" :key="child.name"
                                    :index="item.path+'/'+child.path">
                                <template slot="title">
                                    <i v-if="child.meta&&child.meta.icon" :class="child.meta.icon"></i>
                                    <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
                                </template>
                            </el-menu-item>
                        </template>
                    </template>
                </el-submenu>
            </template>
        </template>
    </div>
</template>

<script>
    export default {
        name: "sideBarItem",
        props:{
            routes: {
                type:Array,
            }
        },
        methods:{
            hasOneShowingChildren(children) {
                /*将子路由数组取出*/
                const showingChildren = children.filter(item => {
                    return !item.hidden
                });
                return showingChildren.length === 1;
            }
        }
    }
</script>

<style scoped>
</style>