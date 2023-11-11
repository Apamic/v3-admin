<template>
    <a-layout-sider :collapsed="collapsed" :trigger="null" collapsible>
        <div class="logo"/>
        <a-menu v-model:selectedKeys="state.selectedKeys" theme="dark" mode="inline">
            <template v-for="(item,k) in routerList">
                <menuItem :item="item">
                </menuItem>

                <!--        <a-sub-menu :key="i.name" v-if="i.children?.length > 0">-->
                <!--          <template #title>-->
                <!--              <span>-->
                <!--                <span>{{i.name}}</span>-->
                <!--              </span>-->
                <!--          </template>-->
                <!--          <a-menu-item :key="i.name" @click="clickMenuItem(i.name)">-->
                <!--            <span >{{i.name}}</span>-->
                <!--          </a-menu-item>-->
                <!--        </a-sub-menu>-->
                <!--        <a-menu-item :key="i.name" v-else @click="clickMenuItem(i.name)">-->
                <!--          <span >{{i.name}}</span>-->
                <!--        </a-menu-item>-->
            </template>

            <!--      <a-menu-item key="1" @click="clickMenuItem('option1')">-->
            <!--        <span v-bind="$attrs">Options 1</span>-->
            <!--      </a-menu-item>-->
            <!--      <a-sub-menu key="sub2">-->
            <!--        <template #title>-->
            <!--            <span>-->
            <!--              <span>Team</span>-->
            <!--            </span>-->
            <!--        </template>-->
            <!--        <a-menu-item key="team1" @click="clickMenuItem('team1')">-->
            <!--          Team 1-->
            <!--        </a-menu-item>-->
            <!--        <a-sub-menu key="team2">-->
            <!--          <template #title>-->
            <!--            <span>-->
            <!--              <span>Team2</span>-->
            <!--            </span>-->
            <!--          </template>-->
            <!--          <a-menu-item key="team22"  @click="clickMenuItem('team22')">-->
            <!--            <span>-->
            <!--              <TeamOutlined/>-->
            <!--              <span>Team22</span>-->
            <!--            </span>-->
            <!--          </a-menu-item>-->
            <!--        </a-sub-menu>-->
            <!--      </a-sub-menu>-->
        </a-menu>
    </a-layout-sider>
</template>

<script setup>
//import { Menu } from 'ant-design-vue';
import {reactive, ref} from "vue";
import menuItem from './menuItem.vue'
// import {
//   UserOutlined,
//   PieChartOutlined,
//   TeamOutlined,
//   FileOutlined,
//   DesktopOutlined,
// } from '@ant-design/icons-vue';
import {useRoute, useRouter} from "vue-router";


defineProps({
    collapsed: {
        type: Boolean
    }
});

const currentRoute = useRoute();
const router = useRouter();

const routerList = router.options.routes[0].children
console.log(routerList, 'routerList')


const state = reactive({
    selectedKeys: ['option1'],
    openKeys: [],
    routerList: routerList
})


// console.log(currentRoute.meta)

const clickMenuItem = (key) => {
    console.log(key)
    if (key === currentRoute.name) return;
    const targetRoute = getRouteByName(key);
    const {isExt, openMode} = targetRoute?.meta || {};
    if (isExt && openMode !== 2) {
        window.open(key);
    } else {
        router.push({name: key});
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
