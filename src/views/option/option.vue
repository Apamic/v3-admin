<template>
  <div class="page-container">option1</div>
</template>


<script setup>
import { useUserStore } from '@/store/modules/user';

console.log( useUserStore().name)


</script>

<style scoped>
.page-container {
  width: 100%;
  height: 100%;
  background: white;
}
</style>