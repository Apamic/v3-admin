<template>
  <a-layout-sider :collapsed="collapsed" :trigger="null" collapsible>
    <div class="logo" />
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <a-menu-item key="1" @click="clickMenuItem">
        <pie-chart-outlined />
        <span>Options 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <desktop-outlined />
        <span>Option 2</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template #title>
            <span>
              <user-outlined />
              <span>User</span>
            </span>
        </template>
        <a-menu-item key="3">Tom</a-menu-item>
        <a-menu-item key="4">Bill</a-menu-item>
        <a-menu-item key="5">Alex</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #title>
            <span>
              <team-outlined />
              <span>Team</span>
            </span>
        </template>
        <a-menu-item key="team1" @click="clickMenuItem">Team 1</a-menu-item>
        <a-menu-item key="8">Team 2</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="9">
        <file-outlined />
        <span>File</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
  import {ref} from "vue";
  import {
    UserOutlined,
    PieChartOutlined,
    TeamOutlined,
    FileOutlined,
    DesktopOutlined,
  } from '@ant-design/icons-vue';
  import {useRoute, useRouter} from "vue-router";

  defineProps({
    collapsed: {
      type: Boolean
    }
  })

  const currentRoute = useRoute();
  const router = useRouter();

  let selectedKeys = ref(['1'])


  const clickMenuItem = ({ item, key, keyPath }) => {
    console.log(key)
    if (key === currentRoute.name) return;
    const targetRoute = getRouteByName(key);
    const { isExt, openMode } = targetRoute?.meta || {};
    if (isExt && openMode !== 2) {
      window.open(key);
    } else {
      router.push({ name: key });
    }
  };


</script>

<style scoped>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}
</style>
