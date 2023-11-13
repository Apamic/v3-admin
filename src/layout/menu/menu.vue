<template>
    <a-layout-sider :collapsed="collapsed" :trigger="null" collapsible>
        <a-menu v-model:selectedKeys="state.selectedKeys" theme="dark" mode="inline" collapsible >
            <template v-for="item in routerList">
                <menuItem :item="item">
                </menuItem>
            </template>
        </a-menu>
    </a-layout-sider>
</template>

<script setup>

import {reactive, ref} from "vue";
import menuItem from './menuItem.vue'


import {useRoute, useRouter} from "vue-router";


defineProps({
    collapsed: {
        type: Boolean
    }
});

const currentRoute = useRoute();
const router = useRouter();

const routerList = router.options.routes[0].children
//console.log(routerList, 'routerList')


const state = reactive({
    selectedKeys: [],
    openKeys: [],
    routerList: routerList
})

//const getRouteByName = name => router.getRoutes().find((n) => n.name === name);
// console.log(currentRoute.meta)

// const clickMenuItem = (key) => {
//     console.log(key)
//     if (key === currentRoute.name) return;
//     const targetRoute = getRouteByName(key);
//     const {isExt, openMode} = targetRoute?.meta || {};
//     if (isExt && openMode !== 2) {
//         window.open(key);
//     } else {
//         router.push({name: key});
//     }
// };


</script>

<style scoped>
/*.logo {*/
/*    height: 32px;*/
/*    background: rgba(255, 255, 255, 0.3);*/
/*    margin: 16px;*/
/*}*/
</style>
