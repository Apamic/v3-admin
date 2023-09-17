
<template>
  <ConfigProvider>
    <router-view #="{ Component }">
      <component :is="Component" />
    </router-view>
  </ConfigProvider>

</template>


<script setup>
import { ConfigProvider } from 'ant-design-vue';
</script>

<style scoped>
#app {
  height: 100%;
}


</style>
