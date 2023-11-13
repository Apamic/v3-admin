<template>
    <div class="view-container">
        dash board
    </div>
</template>

<script setup>
import {defineOptions} from "vue";

defineOptions({
    name: 'index'
})
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
