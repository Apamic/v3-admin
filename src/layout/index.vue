<template>
  <a-layout class="layout">
    <AsideMenu v-model:collapsed="collapsed"></AsideMenu>
    <a-layout>
      <PageHeader v-model:collapsed="collapsed"></PageHeader>
      <a-layout-content style="margin: 0 16px" class="layout-content">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>

        <router-view v-slot="{ Component }">
          <template v-if="Component">
            <transition name="fade-transform"  mode="out-in" appear>
              <component :is="Component" />
            </transition>
          </template>

        </router-view>

<!--        <router-view v-slot="{ Component }">-->
<!--          <template v-if="Component">-->
<!--            <transition-->
<!--                :name="Object.is(route.meta?.transitionName, false) ? '' : 'fade-transform'"-->
<!--                mode="out-in"-->
<!--                appear-->
<!--            >-->
<!--              <keep-alive :include="keepAliveComponents">-->
<!--                <component :is="Component" :key="route.fullPath" />-->
<!--              </keep-alive>-->
<!--            </transition>-->
<!--          </template>-->
<!--        </router-view>-->

<!--        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">-->
<!--          Bill is a cat.-->
<!--        </div>-->
      </a-layout-content>
      <a-layout-footer >
        <PageFooter></PageFooter>
      </a-layout-footer>
    </a-layout>
  </a-layout>

</template>

<script setup>
import PageHeader from './header/header.vue';
import PageFooter from './footer/footer.vue';
import AsideMenu from './menu/menu.vue';
import { UserOutlined, VideoCameraOutlined, UploadOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';

import {ref} from "vue";

let collapsed = ref(false)




</script>

<style lang="less" scoped>
.site-layout .site-layout-background {
  background: #fff;
}


.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.layout-content {
  height: calc(100% - @header-height);
}

</style>
