
<template>
  <ConfigProvider :locale="getAntdLocale"
                  :theme="themeConfig"
  >
    <router-view #="{ Component }">
      <component :is="Component" />
    </router-view>
  </ConfigProvider>

</template>


<script setup>
import { ConfigProvider } from 'ant-design-vue';
import {computed} from "vue";
import { useLocale } from "@/locales/useLocale.js";


let {getAntdLocale} = useLocale();

const themeConfig = {}

// const themeConfig = computed(() =>
//     Object.assign(
//         {
//             token: {
//                 colorPrimary: '#0960bd',
//                 colorSuccess: '#55D187',
//                 colorWarning: '#EFBD47',
//                 colorError: '#ED6F6F',
//                 colorInfo: '#0960bd',
//             },
//         },
//         isDark.value ? darkTheme : {},
//     ),
// );

</script>

<style scoped>
#app {
  height: 100%;
}


</style>
