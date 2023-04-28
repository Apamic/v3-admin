<template>
  <a-layout-header style="background: #fff; padding: 0">
<!--    <MenuUnfoldOutlined-->
<!--        v-if="collapsed"-->
<!--        class="trigger"-->
<!--        @click="() => (collapsed = !collapsed)"-->
<!--    />-->
<!--    <MenuFoldOutlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />-->
    <span class="trigger" @click="() => emit('update:collapsed', !collapsed)">
       <component :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
    </span>

  </a-layout-header>
</template>

<script setup>
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
  import {ref} from "vue";

  defineProps({
    collapsed: {
      type: Boolean
    }
  })

  const emit = defineEmits(['update:collapsed']);



</script>

<style scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}
</style>
