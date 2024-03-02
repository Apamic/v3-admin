<template>
    <view class="tabs-view-content">
        <RouterView v-slot="{ Component }">
            <template v-if="Component">
                <Transition
                    :name="Object.is(route.meta?.transitionName, false) ? '' : 'fade-transform'"
                    mode="out-in"
                    appear
                >
                    <KeepAlive :include="keepAliveComponents">
                        <component :is="Component" :key="route.fullPath"/>
                    </KeepAlive>
                </Transition>
            </template>
        </RouterView >
    </view>
</template>

<script setup>

import {useRoute, useRouter} from "vue-router";
import {computed, watch} from "vue";
import {useTabsViewStore, blackList} from '@/store/modules/tabsView';
import {useKeepAliveStore} from '@/store/modules/keepAlive';

defineOptions({
    name: 'pageLayout',
})

const route = useRoute();

const keepAliveStore = useKeepAliveStore();

const keepAliveComponents = computed(() => keepAliveStore.list);

</script>

<style scoped>

</style>
