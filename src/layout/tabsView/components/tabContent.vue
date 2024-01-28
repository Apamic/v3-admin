<template>
    <Dropdown placement="bottomLeft">
        <span class="redo">
            <DownOutlined />
        </span>
        <template #overlay>
            <Menu >
                <Menu.Item key="1" :disabled="activeKey !== route.fullPath"  @click="reloadPage">
                    <ReloadOutlined/>
                    {{ '重新加载' }}
                </Menu.Item>
                <Menu.Item key="2"  @click="removeTab(route)">
                    <CloseOutlined/>
                    {{ '关闭当前标签页' }}
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3" @click="closeLeft(route)" :disabled="disabledLeft">
                    <VerticalRightOutlined />
                    {{ '关闭左侧标签页' }}
                </Menu.Item>
                <Menu.Item key="4" @click="closeRight(route)" :disabled="disabledRight">
                    <VerticalLeftOutlined />
                    {{ '关闭右侧标签页' }}
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="5" @click="closeOther(route)" :disabled="disabledCloseOther">
                    <ColumnWidthOutlined />
                    {{ '关闭其他标签页' }}
                </Menu.Item>
                <Menu.Item key="6" @click="closeAll()" :disabled="disabledClose">
                    <MinusOutlined />
                    {{ '关闭全部标签页' }}
                </Menu.Item>
            </Menu>
        </template>
    </Dropdown>
</template>

<script setup>
import {Dropdown,Menu,message} from 'ant-design-vue';
import {defineOptions, unref, computed, watch} from "vue";
import { useRoute, useRouter } from 'vue-router';
import { useTabsViewStore, blackList } from '@/store/modules/tabsView';
import {useKeepAliveStore} from '@/store/modules/keepAlive';
import { REDIRECT_NAME } from '@/enums/routerEnum';
import {
    DownOutlined,
    ReloadOutlined,
    CloseOutlined,
    VerticalRightOutlined,
    VerticalLeftOutlined,
    ColumnWidthOutlined,
    MinusOutlined,
} from '@ant-design/icons-vue';


defineOptions({
    name: "tabContent"
})

// 标签页列表
const tabsList = computed(() => tabsViewStore.getTabsList);

const route = useRoute();
const router = useRouter();

const tabsViewStore = useTabsViewStore();

const activeKey = computed(() => tabsViewStore.getCurrentTab?.fullPath);

const currentRouteIndex = computed(() => tabsList.value.findIndex(item => item.fullPath === route.fullPath));

const disabledLeft = computed(() =>  {
    return currentRouteIndex.value > 0 ? false : true
});

const disabledRight = computed(() => {
    return  currentRouteIndex.value < unref(tabsList).length - 1  ? false : true
});

const disabledCloseOther = computed(() => unref(tabsList).length === 1 ? true : false);

const disabledClose = computed(() => {
    if (route.fullPath === '/dashboard')  return true
    return disabledCloseOther.value
});

// 目标路由是否等于当前路由
const isCurrentRoute = (route) => {
    return router.currentRoute.value.matched.some((item) => item.name === route.name);
};

const reloadPage = () => {
    router.replace({
        name: REDIRECT_NAME,
        params: {
            path: unref(route).fullPath,
        },
    });
}

const removeTab = (route) => {
    if (tabsList.value.length === 1) {
        return message.warning('这已经是最后一页，不能再关闭了！');
    }
    tabsViewStore.closeCurrentTab(route);
}

const closeLeft = (route) => {
    tabsViewStore.closeLeftTabs(route);
    !isCurrentRoute(route) && router.replace(route.fullPath);
}

const closeRight = (route) => {
    tabsViewStore.closeRightTabs(route);
    !isCurrentRoute(route) && router.replace(route.fullPath);
}

const closeOther = (route) => {
    tabsViewStore.closeOtherTabs(route);
    !isCurrentRoute(route) && router.replace(route.fullPath);
}

const closeAll = () => {
    if (tabsList.value.length === 1) {
        return message.warning('这已经是最后一页，不能再关闭了！');
    }
    localStorage.removeItem('routes');
    tabsViewStore.closeAllTabs();
    router.replace('/');
}

</script>

<style lang="less" scoped>
.redo {
    display: inline-block;
    width: 36px;
    height: 30px;
    border-left: 1px solid #eee;
    color: #8b949e;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
}
</style>
