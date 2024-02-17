<template>
    <Layout class="layout">
        <Layout.Sider class="layout-sider" style="min-height: 100vh;" collapsible v-model:collapsed="collapsed" :width="asiderWidth" :trigger="null">
            <Logo :collapsed="collapsed"></Logo>
            <AsideMenu :collapsed="collapsed"></AsideMenu>
        </Layout.Sider>
        <Layout>
            <PageHeader v-model:collapsed="collapsed"></PageHeader>
            <tabsView></tabsView>
            <Layout.Content class="layout-content">
                <PageLayout></PageLayout>
            </Layout.Content>
            <Layout.Footer>
                <PageFooter></PageFooter>
            </Layout.Footer>
        </Layout>
    </Layout>

</template>

<script setup>
import {Layout} from "ant-design-vue";
import PageHeader from './header/header.vue';
import PageFooter from './footer/footer.vue';
import AsideMenu from './menu/menu.vue';
import PageLayout from './page/index.vue'
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
        display: flex;
        position: relative;
        flex-direction: column;
        flex-grow: 1;
        width: 100%;
        height: 0;
        min-height: 0;
        overflow: auto;
    }
}

</style>
