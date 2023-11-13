<template>
    <span>{{item.meta?.title}}</span>
</template>

<script setup>
defineOptions({
    name: 'menuItemContent'
})

defineProps({
    item: {
        type: Object,
        default: () => ({})
    }
})
</script>

<style lang="less" scoped>

</style>
