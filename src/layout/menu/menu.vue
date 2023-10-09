<template>
  <a-layout-sider :collapsed="collapsed" :trigger="null" collapsible>
    <div class="logo" />
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <a-menu-item key="1" @click="clickMenuItem('option1')">
        <PieChartOutlined/>
        <span>Options 1</span>
      </a-menu-item>
      <a-sub-menu key="sub2">
        <template #title>
            <span>
              <TeamOutlined/>
              <span>Team</span>
            </span>
        </template>
        <a-menu-item key="team1" @click="clickMenuItem('team1')">
          Team 1
        </a-menu-item>
        <a-sub-menu key="team2">
          <template #title>
            <span>
              <TeamOutlined/>
              <span>Team2</span>
            </span>
          </template>
          <a-menu-item key="team22"  @click="clickMenuItem('team22')">
            <span>
              <TeamOutlined/>
              <span>Team22</span>
            </span>
          </a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
      <a-menu-item key="9">
        <FileOutlined/>
        <span>File</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
  //import { Menu } from 'ant-design-vue';
  import { ref } from "vue";
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
  });

  const currentRoute = useRoute();
  const router = useRouter();

  let selectedKeys = ref(['1'])


  const clickMenuItem = ( key ) => {
    // console.log(key)
    // if (key === currentRoute.name) return;
    // const targetRoute = getRouteByName(key);
    // const { isExt, openMode } = targetRoute?.meta || {};
    // if (isExt && openMode !== 2) {
    //   window.open(key);
    // } else {
      router.push({ name: key });
    // }
  };


</script>

<style scoped>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}
</style>
