<template>
    <a-menu v-model:selectedKeys="state.selectedKeys" :open-keys="isSideMenu ? state.openKeys : []" theme="dark" mode="inline" collapsible>
        <template v-for="item in routerList">
            <menuItem :item="item">
            </menuItem>
        </template>
    </a-menu>
</template>

<script setup>

import {reactive, ref, watch} from "vue";
import menuItem from './menuItem.vue'

import {useRoute, useRouter} from "vue-router";

const isSideMenu = true

const props = defineProps({
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

// 根据activeMenu获取指定的menu
const getTargetMenuByActiveMenuName = (activeMenu) => {
    return router.getRoutes().find((n) => [n.name, n.path].includes(activeMenu));
};

const getRouteByName = name => router.getRoutes().find((n) => n.name === name);

// 获取当前打开的子菜单
const getOpenKeys = () => {
    const meta = currentRoute.meta;
    if (meta?.activeMenu) {
        const targetMenu = getTargetMenuByActiveMenuName(meta.activeMenu);
        return targetMenu?.meta?.namePath ?? [meta?.activeMenu];
    }

    return (
        meta?.hideInMenu
            ? state?.openKeys || []
            : currentRoute.meta?.namePath ?? currentRoute.matched.slice(1).map((n) => n.name)
    )
}

// 监听菜单收缩状态
watch(
    () => props.collapsed,
    (newVal) => {
        state.openKeys = newVal ? [] : getOpenKeys();
        state.selectedKeys = [currentRoute.name]
    }
)

// 跟随页面路由变化，切换菜单选中状态
watch(
    () => currentRoute.fullPath,
    () => {
        if (currentRoute.name === 'LOGIN_NAME' || props.collapsed) return
        state.openKeys = getOpenKeys();
        const meta = currentRoute.meta;
        if (meta?.activeMenu) {
            const targetMenu = getTargetMenuByActiveMenuName(meta.activeMenu);
            state.selectedKeys = [targetMenu?.name ?? meta?.activeMenu]
        } else {
            state.selectedKeys = [currentRoute.meta?.activeMenu ?? currentRoute.name]
        }
    },
    {
        immediate:true
    }
)

</script>

<style lang="less" scoped>

</style>
