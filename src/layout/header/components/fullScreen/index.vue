<template>
    <a-tooltip :title="getTitle" placement="bottom" :mouse-enter-delay="0.5">
        <span style="color: #000000">
            <component :is="FullscreenExitOutlined"></component>
        </span>
    </a-tooltip>
</template>

<script setup>
import {computed} from "vue";
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue';


const getTitle = computed(() => {

})
</script>

<style lang="less" scoped>

</style>
