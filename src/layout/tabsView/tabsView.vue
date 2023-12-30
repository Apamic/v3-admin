<template>
    <div class="tabs-view">
<!--        <Tabs-->
<!--            :active-key="activeKey"-->
<!--            hide-add-->
<!--            type="editable-card"-->
<!--            class="tabs"-->
<!--            @change="changePage"-->
<!--            @edit="editTabItem"-->
<!--        >-->

<!--        </Tabs>-->

        <view class="tabs-view-content">
            <router-view v-slot="{ Component }">
                <template v-if="Component">
                    <transition
                        :name="Object.is(route.meta?.transitionName, false) ? '' : 'fade-transform'"
                        mode="out-in"
                        appear
                    >
                        <keep-alive :include="keepAliveComponents">
                            <component :is="Component" :key="route.fullPath"/>
                        </keep-alive>
                    </transition>
                </template>
            </router-view>
        </view>
    </div>
</template>

<script setup>
import {Dropdown, Tabs, message, Menu} from 'ant-design-vue';
import {useRoute, useRouter} from 'vue-router';
import {computed} from "vue";
import {useTabsViewStore} from '@/store/modules/tabsView';
import {useKeepAliveStore} from '@/store/modules/keepAlive';

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
console.log(tabsList.value,'tabsList')

// 缓存的路由组件列表
const keepAliveComponents = computed(() => keepAliveStore.list);


// 关闭当前页面
const removeTab = (route) => {
    if (tabsList.value.length === 1) {
        return message.warning('这已经是最后一页，不能再关闭了！');
    }
    tabsViewStore.closeCurrentTab(route);
}

// 切换页面
const changePage = (key) => {
    Object.is(route.fullPath, key) || router.push(key);
};

const editTabItem = (targetKey, action) => {
    if (action == 'remove') {
        removeTab(tabsList.value.find((item) => item.fullPath == targetKey));
    }
}

</script>

<style lang="less" scoped>
.tabs-view {
    border-top: 1px solid #eee;
    .tabs-view-content {
        /* height: calc(100vh - #{$header-height}); */
        //height: calc(100vh - 110px);
        //padding: 20px 14px 0;
        //overflow: auto;
    }

}
</style>
