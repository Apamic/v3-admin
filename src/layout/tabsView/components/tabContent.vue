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
                    {{ '关闭标签页' }}
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3" @click="closeLeft(route)">
                    <VerticalRightOutlined />
                    {{ '关闭左侧标签页' }}
                </Menu.Item>
                <Menu.Item key="4" @click="closeRight(route)">
                    <VerticalLeftOutlined />
                    {{ '关闭右侧标签页' }}
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="5" @click="closeOther(route)">
                    <ColumnWidthOutlined />
                    {{ '关闭其他标签页' }}
                </Menu.Item>
                <Menu.Item key="6" @click="closeAll(route)">
                    <MinusOutlined />
                    {{ '关闭全部标签页' }}
                </Menu.Item>
            </Menu>
        </template>
    </Dropdown>
</template>

<script setup>
import {Dropdown,Menu,message} from 'ant-design-vue';
import {defineOptions, unref,computed} from "vue";
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

// 标签页列表
const tabsList = computed(() => tabsViewStore.getTabsList);


defineOptions({
    name: "tabContent"
})

const route = useRoute();
const router = useRouter();

const tabsViewStore = useTabsViewStore();
// console.log(route.fullPath)
//console.log(REDIRECT_NAME)

const activeKey = computed(() => tabsViewStore.getCurrentTab?.fullPath);

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

const closeLeft = () => {

}

const closeRight = () => {}

const closeOther = () => {}

const closeAll = () => {}

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
