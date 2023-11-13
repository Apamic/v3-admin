<template>
  <div class="box">option1</div>
</template>


<script setup>
import { useUserStore } from '@/store/modules/user';

console.log( useUserStore().name)


</script>

<style lang="less" scoped>
.box {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 120px);
    padding: 12px;
    background: #fff;
img {
    flex: 1;
    min-height: 0;
}

.ant-form {
    flex: 2;
}
}
</style>
