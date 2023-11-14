<template>
    <a-layout class="layout">
        <a-layout-sider class="layout-sider" style="min-height: 100vh;" collapsible v-model:collapsed="collapsed" :width="asiderWidth" :trigger="null">
            <Logo :collapsed="collapsed"></Logo>
            <AsideMenu :collapsed="collapsed"></AsideMenu>
        </a-layout-sider>
        <a-layout>
            <PageHeader v-model:collapsed="collapsed"></PageHeader>
            <a-layout-content class="layout-content">
                <tabsView></tabsView>
            </a-layout-content>
            <a-layout-footer>
                <PageFooter></PageFooter>
            </a-layout-footer>
        </a-layout>
    </a-layout>

</template>

<script setup>
import PageHeader from './header/header.vue';
import PageFooter from './footer/footer.vue';
import AsideMenu from './menu/menu.vue';
import Logo from './logo/index.vue';
import tabsView from './tabsView/tabsView.vue';

import {computed, ref} from "vue";

let collapsed = ref(false)

const asiderWidth = computed(() => (collapsed.value ? 80 : 200));

</script>

<style lang="less" scoped>
.layout {
    display: flex;
    height: 100vh;
    overflow: hidden;

    .ant-layout {
        overflow: hidden;
    }

    .layout-sider {
        overflow: auto;
        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
    }

    .layout-content {
        flex: none;
        margin: 24px 16px 0;
        overflow: inherit;
    }
}

</style>
