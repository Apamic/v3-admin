<template>
    <Tooltip :title="'搜索'" placement="bottom" :mouse-enter-delay="0.5">
        <slot><SearchOutlined @click="visible = true" /></slot>
    </Tooltip>

</template>

<script setup>
import { SearchOutlined } from '@ant-design/icons-vue';
import { Empty, Tooltip } from 'ant-design-vue';

</script>

<style scoped>

</style>
