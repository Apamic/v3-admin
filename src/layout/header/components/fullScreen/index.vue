<template>
    <a-tooltip :title="getTitle" placement="bottom" :mouse-enter-delay="0.5">
        <span style="color: #000000" @click="toggle">
            <component :is="isFullscreen ? FullscreenOutlined : FullscreenExitOutlined"></component>
        </span>
    </a-tooltip>
</template>

<script setup>
import {computed,unref,ref} from "vue";
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue';

// import { useFullscreen } from '@vueuse/core'; //npm vueuse

// const { toggle, isFullscreen } = useFullscreen();

let isFullscreen = ref(true)

const toggle = () => isFullscreen.value = !isFullscreen.value

const getTitle = computed(() => {
    return unref(isFullscreen) ? '全屏' : '退出全屏'
})
</script>

<style lang="less" scoped>

</style>
