<template>
    <Layout.Header class="layout-header" :style="headerStyle">
        <div style="display: flex;align-items: center;height: 48px;">

            <span class="trigger" @click="() => emit('update:collapsed', !collapsed)">
               <component :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined"/>
            </span>

            <a-breadcrumb>
                <template v-for="(routeItem,rotueIndex) in menus" :key="routeItem.fullPath">
                    <a-breadcrumb-item v-if="routeItem?.name != 'Layout'">
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
        </div>
        <div class="view-layout-header-action">
            <!--            <fullScreen></fullScreen>-->
            <Search :class="`view-action-item`"></Search>
            <Notify :class="`view-action-item notify-item`"></Notify>
            <LocalePicker :class="`view-action-item`"></LocalePicker>
            <UserDropdown :class="`view-action-item`"></UserDropdown>
            <projectSetting :class="`view-action-item`"></projectSetting>
        </div>
    </Layout.Header>
</template>

<script lang="tsx" setup>
import {MenuUnfoldOutlined, MenuFoldOutlined, PoweroffOutlined, QuestionCircleOutlined} from '@ant-design/icons-vue';
import {computed, nextTick, ref} from "vue";
import {useRouter, useRoute} from 'vue-router';
import {useUserStore} from '@/store/modules/user.js';
import fullScreen from './components/fullScreen/index.vue';
import projectSetting from './components/setting.vue';
import {Modal, message, Layout, Space} from "ant-design-vue";
import Search from './components/search/index.vue';
import Notify from './components/notify/index.vue';
import UserDropdown from './components/userDropdown/index.vue'
import LocalePicker from '@/components/basic/localePicker/index.vue';


defineProps({
    collapsed: {
        type: Boolean
    }
})

const headerStyle = computed(() => {
    return {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        // height: '48px',
        // lineHight: '48px',
        // color: 'rgba(255, 255, 255, 0.85)'
    }
})

const emit = defineEmits(['update:collapsed']);
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const userInfo = computed(() => userStore.userInfo);


const menus = computed(() => {
    if (route.meta?.namePath) {
        // console.log(route.meta.namePath)
    }
    return route.matched;
})

console.log(menus.value, 'menus')

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

const onDropOut = () => {
    Modal.confirm({
        title: '您确定要退出登录吗？',
        icon: <QuestionCircleOutlined/>,
        centered: true,
        onOk: async () => {
            if (userStore.userInfo.phone !== '15172364292') {
                await userStore.logout();
            }
            localStorage.clear();
            message.success('成功退出登录');
            await nextTick();
            router.replace({
                name: LOGIN_NAME,
                query: {
                    redirect: route.fullPath,
                }
            })
        }
    })
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
    padding-left: 0;
    padding-right: 0;
    height: 48px;
    line-height: 48px;

    * {
        cursor: pointer;
    }
}

.trigger {
    padding: 0 10px;
    margin-right: 20px;
    font-size: 18px;
    //color: #000;
    line-height: 48px;
    transition: color 0.3s;
}

.trigger:hover {
    color: #1890ff;
}


</style>
<style lang="less">
.view-layout-header-action {
    display: flex;
    align-items: center;

    .view-action-item {
        display: flex !important;
        align-items: center;
        height: 48px;
        padding: 0 10px;
        font-size: 1.2em;

        &:hover {
            background-color: #f6f6f6;
        }
    }

    .notify-item {
        .ant-badge {
            display: flex;
            align-items: center;
            font-size: 18px;
            .ant-badge-dot {
                top: -4px;
                right: -4px;
            }
        }
    }
}

</style>
