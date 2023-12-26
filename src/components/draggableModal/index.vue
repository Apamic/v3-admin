<template>
    <teleport :to="getContainer()">

    </teleport>
</template>

<script setup>
import { modalProps } from 'ant-design-vue/es/modal/Modal';


const props = defineProps({
    ...modalProps(),
    // fullscreen: {
    //     type: Boolean,
    //     default: false,
    // },
    getContainer: {
        type: Function,
        default: () => document.body,
    },
});
</script>

<style scoped>

</style>
