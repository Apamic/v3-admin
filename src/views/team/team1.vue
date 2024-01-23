<template>
  <div class="view-container">
    team1
    <span class="demo">
      demo
    </span>
  </div>
</template>

<script setup>
import common from '@/router/staticModules';
import {defineOptions} from "vue";

console.log(common)

defineOptions({
    name: 'team1'
})
</script>

<style lang="less" scoped>


</style>
