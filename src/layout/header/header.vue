<template>
    <a-layout-header style="background: #fff; padding: 0">

        <span class="trigger" @click="() => emit('update:collapsed', !collapsed)">
           <component :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined"/>
        </span>

        <a-breadcrumb>
            <template v-for="(routeItem,rotueIndex) in menus" :key="routeItem.name">

            </template>
        </a-breadcrumb>

    </a-layout-header>
</template>

<script setup>
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons-vue';
import {computed, ref} from "vue";
import {useRouter,useRoute} from 'vue-router';

defineProps({
    collapsed: {
        type: Boolean
    }
})

const emit = defineEmits(['update:collapsed'])

const router = useRouter();
const route = useRoute();

console.log(route.meta)

const menus = computed(() => {
    if (route.meta?.namePath) {
        console.log(route.meta.namePath)
    }
})



</script>

<style scoped>



.trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

.trigger:hover {
    color: #1890ff;
}
</style>
