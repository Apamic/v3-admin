<template>
  <div class="box">option1</div>
</template>


<script setup>
import { useUserStore } from '@/store/modules/user';

console.log( useUserStore().name)


</script>

<style lang="less" scoped>
.box {

img {
    flex: 1;
    min-height: 0;
}

.ant-form {
    flex: 2;
}
}
</style>
