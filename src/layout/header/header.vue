<template>
    <a-layout-header class="layout-header" :style="headerStyle">
        <a-space size="large">

            <span class="trigger" @click="() => emit('update:collapsed', !collapsed)">
               <component :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined"/>
            </span>

            <a-breadcrumb>
                <template v-for="(routeItem,rotueIndex) in menus" :key="routeItem.name">
                    <a-breadcrumb-item>
                        <span>{{ routeItem?.meta?.title }}</span>
                        <template v-if="routeItem?.children?.length" #overlay>
                            <a-menu :selected-keys="getSelectKeys(rotueIndex)">
                                <template v-for="childItem in routeItem?.children" :key="childItem.name">
                                    <a-menu-item @click="clickMenuItem(childItem)">
                                        <span>{{ childItem?.meta?.title }}</span>
                                    </a-menu-item>
                                </template>
                            </a-menu>
                        </template>
                    </a-breadcrumb-item>
                </template>
            </a-breadcrumb>
        </a-space>
        <a-space size="large">
            <fullScreen></fullScreen>
        </a-space>
    </a-layout-header>
</template>

<script setup>
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons-vue';
import {computed, ref} from "vue";
import {useRouter, useRoute} from 'vue-router';
import fullScreen from './components/fullScreen/index.vue';


defineProps({
    collapsed: {
        type: Boolean
    }
})

const headerStyle = computed(() => {
    return {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        color: 'rgba(255, 255, 255, 0.85)'
    }
})

const emit = defineEmits(['update:collapsed']);

const router = useRouter();
const route = useRoute();

const menus = computed(() => {
    if (route.meta?.namePath) {
        console.log(route.meta.namePath)
    }
    return route.matched;
})


const getSelectKeys = (rotueIndex) => {
    return [menus.value[rotueIndex + 1]?.name]
}

const findLastChild = (route) => {
    if (typeof route?.redirect === 'object') {
        const redirectValues = Object.values(route.redirect);
        if (route?.children?.length) {
            const target = route.children.find((n) => {
                return redirectValues.some((m) =>
                    [n.name, n.path, n.meta?.fullPath].some((v) => v === m)
                )
            })
            return findLastChild(target);
        }
        return redirectValues.find((n) => typeof n === 'string');
    } else if (typeof route?.redirect === 'string') {
        if (route?.children?.length) {
            const target = route.children.find((n) =>
                [n.name, n.path, n.meta?.fullPath].some((m) => m === route?.redirect)
            )
            return findLastChild(target);
        }
        return route?.redirect;
    }
    return route;
}

const getRouteByName = (name) => router.getRoutes().find((n) => n.name === name);

const clickMenuItem = (menuItem) => {
    const lastChild = findLastChild(menuItem);

    const targetRoute = getRouteByName(lastChild?.name);

    console.log('lastChild', menuItem, lastChild, targetRoute);
    const {isExt, openMode} = targetRoute?.meta || {};
    if (isExt && openMode !== 2) {
        window.open(lastChild?.name);
    } else {
        router.push({name: lastChild?.name});
    }

}


</script>

<style lang="less" scoped>

.layout-header {
    display: flex;
    position: sticky;
    z-index: 10;
    top: 0;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;

    * {
        cursor: pointer;
    }
}

.trigger {
    font-size: 18px;
    color: #000;
    line-height: 64px;
    transition: color 0.3s;
}

.trigger:hover {
    color: #1890ff;
}
</style>
