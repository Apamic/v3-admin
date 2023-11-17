<template>
    <a-layout-header class="layout-header" style="background: #fff;">

        <span class="trigger" @click="() => emit('update:collapsed', !collapsed)">
           <component :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined"/>
        </span>

        <a-breadcrumb>
            <template v-for="(routeItem,rotueIndex) in menus" :key="routeItem.name">
                <a-breadcrumb-item>
                    <span>{{routeItem?.meta?.title}}</span>
                    <template v-if="routeItem?.children?.length" #overlay>
                        <a-menu :selected-keys="getSelectKeys(rotueIndex)">
                            <template v-for="childItem in routeItem?.children" :key="childItem.name">
                                <a-menu-item  >
                                    <span>{{routeItem?.meta?.title}}</span>
                                </a-menu-item>
                            </template>
                        </a-menu>
                    </template>
                </a-breadcrumb-item>
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
    return route.matched;
})


const getSelectKeys = (rotueIndex) => {
    return [menus.value[rotueIndex + 1]?.name]
}


</script>

<style lang="less" scoped>

.layout-header {
    display: flex;
    position: sticky;
    z-index: 10;
    top: 0;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    * {
        cursor: pointer;
    }
}

.trigger {
    font-size: 18px;
    line-height: 64px;
    transition: color 0.3s;
}

.trigger:hover {
    color: #1890ff;
}
</style>
