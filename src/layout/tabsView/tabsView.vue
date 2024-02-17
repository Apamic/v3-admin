<template>
    <div class="ant-tabs-view">
        <Tabs
            :active-key="activeKey"
            hide-add
            size="small"
            :animated="false"
            type="editable-card"
            :tabBarGutter="3"
            :class="getWrapClass"
            @change="changePage"
            @edit="editTabItem"
        >
            <template v-for="pageItem in tabsList" :key="pageItem.fullPath">
                <Tabs.TabPane>
                    <template #tab>
                        <div style="display: inline-block">
                            {{ pageItem.meta?.title }}
                        </div>
                    </template>
                </Tabs.TabPane>
            </template>
            <template #rightExtra>
                <TabContent></TabContent>
                <TabRedo></TabRedo>
            </template>
        </Tabs>
    </div>
</template>

<script setup>
import {Dropdown, Tabs, message, Menu} from 'ant-design-vue';
import {useRoute, useRouter} from 'vue-router';
import {computed, watch, ref} from "vue";
import {TABS_ROUTES} from '@/enums/cacheEnum';
import {useTabsViewStore, blackList} from '@/store/modules/tabsView';
import {useKeepAliveStore} from '@/store/modules/keepAlive';
import TabRedo from './components/tabRedo.vue';
import TabContent from './components/tabContent.vue';

import {Storage} from '@/utils/storage';


defineOptions({
    name: 'tabsView'
})

const route = useRoute();
const router = useRouter();
const tabsViewStore = useTabsViewStore();
const keepAliveStore = useKeepAliveStore();


const activeKey = computed(() => tabsViewStore.getCurrentTab?.fullPath);

// 标签页列表
const tabsList = computed(() => tabsViewStore.getTabsList);

// 缓存的路由组件列表
const keepAliveComponents = computed(() => keepAliveStore.list);

// 获取简易的路由对象
const getSimpleRoute = (route) => {
    const {fullPath, hash, meta, name, params, path, query} = route;
    return {fullPath, hash, meta, name, params, path, query};
};

let routes = []

try {
    const routesStr = Storage.get(TABS_ROUTES);
    routes = routesStr ? JSON.parse(routesStr) : [getSimpleRoute(route)];
} catch (e) {
    routes = [getSimpleRoute(route)];
}

// 初始化标签页
tabsViewStore.initTabs(routes);

watch(
    () => route.fullPath,
    () => {
        if (blackList.some((n) => n === route.name)) {
            return
        }
        tabsViewStore.addTabs(getSimpleRoute(route));
        // console.log(tabsViewStore.getTabsList)
        // keepAliveStore.add(...tabsList)
        keepAliveStore.update(tabsList.value);
        console.log(keepAliveComponents.value, 'keepAliveComponents')
    },
    {immediate: true},
);


// 在页面关闭或刷新之前，保存数据
window.addEventListener('beforeunload', () => {
    Storage.set(TABS_ROUTES, JSON.stringify(tabsList.value));
});

// 目标路由是否等于当前路由
const isCurrentRoute = (route) => {
    return router.currentRoute.value.matched.some((item) => item.name === route.name);
};


// 关闭当前页面
const removeTab = (route) => {
    if (tabsList.value.length === 1) {
        return message.warning('这已经是最后一页，不能再关闭了！');
    }
    tabsViewStore.closeCurrentTab(route);
};

// 切换页面
const changePage = (key) => {
    Object.is(route.fullPath, key) || router.push(key);
};

const editTabItem = (targetKey, action) => {
    if (action == 'remove') {
        removeTab(tabsList.value.find((item) => item.fullPath == targetKey));
    }
}

const getWrapClass = computed(() => {
    return [
        'ant-tabs-view',
    ]
})
</script>

<style lang="less">
.ant-tabs-view {
    border-top: 1px solid #eee;
    background: #ffffff;

    .ant-tabs.ant-tabs-card {

        .ant-tabs-nav {
            margin: 0;
            padding-top: 2px;
            height: 30px;
            background: #fff;
            box-shadow: none;
            .ant-tabs-nav-container {
                height: 30px;
                padding-top: 2px;
            }
            .ant-tabs-tab {
                padding-right: 12px;
                height: 30px;
                transition: none;
                background: #fff;
                line-height: 30px;
                color: rgba(0,0,0,.85);
                &:hover {
                    .ant-tabs-tab-remove {
                        opacity: 1;
                    }
                }
                .ant-tabs-tab-remove {
                    width: 8px;
                    height: 30px;
                    margin-right: -4px;
                    margin-left: 2px;
                    transition: none;
                    opacity: 0;
                    color: inherit;
                    font-size: 12px;

                    &:hover {
                        svg {
                            width: 0.8em;
                        }
                    }
                }

                svg {
                    fill: rgba(0,0,0,.85);
                }
            }
            .ant-tabs-tab:not(.ant-tabs-tab-active) {
                &:hover {
                    color: #0960bd;
                }
            }
            .ant-tabs-tab-active {
                position: relative;
                padding-left: 18px;
                transition: none;
                border: 0;
                background: #0960bd;

                div {
                    color: #fff !important;
                }

                .ant-tabs-tab-remove {
                    opacity: 1;
                }

                svg {
                    width: 0.7em;
                    fill: #fff;
                }
            }
        }
        .ant-tabs-nav > div:nth-child(1) {
            padding: 0 6px;
            .ant-tabs-tab {
                margin-right: 3px !important;
            }
        }
        .ant-tabs-tab:not(.ant-tabs-tab-active) {
            .anticon-close {
                font-size: 12px;

                svg {
                    width: 0.6em;
                }
            }
        }

        .ant-tabs-extra-content {
            .redo {
                cursor: pointer;
                &:hover {
                    color: rgba(0,0,0,.85);
                }
            }
        }
    }
}

</style>
