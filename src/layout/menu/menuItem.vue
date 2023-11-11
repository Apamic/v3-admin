<template>
  <a-sub-menu :key="item.name" v-if="item.meta?.type === 0">
    <template #title>
      <span>
        <span>{{item.name}}</span>
      </span>
    </template>
    <template v-for="(items,k) in item.children" v-if="item.children.length > 0">
      <menuItem :item="items"></menuItem>
    </template>
  </a-sub-menu>
  <a-menu-item :key="item.name" v-else @click="clickMenuItem(item.name)">
    <span >{{item.name}}</span>
  </a-menu-item>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";

defineOptions({
  name: 'menuItem'
})

defineProps({
  item: {
    type: Object,
    default: () => {}
  }
})


const router = useRouter();
const currentRoute = useRoute();

const getRouteByName = name => router.getRoutes().find((n) => n.name === name);

const clickMenuItem = ( key ) => {
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

<style lang="less" scoped>

</style>