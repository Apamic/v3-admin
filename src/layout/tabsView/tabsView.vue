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
                        <component :is="Component"/>
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

defineOptions({
    name: 'tabsView'
})

const route = useRoute();
const router = useRouter();

// const activeKey = computed(() => tabsViewStore.getCurrentTab?.fullPath);
//
// // 标签页列表
// const tabsList = computed(() => tabsViewStore.getTabsList);



</script>

<style lang="less" scoped>
.tabs-view {

    .tabs-view-content {
        /* height: calc(100vh - #{$header-height}); */
        //height: calc(100vh - 110px);
        //padding: 20px 14px 0;
        //overflow: auto;
    }

}
</style>
