<template>
    <div class="tabs-view">
        <view class="tabs-view-content">
            <router-view v-slot="{ Component }">
                <template v-if="Component">
                    <transition
                        :name="Object.is(route.meta?.transitionName, false) ? '' : 'fade-transform'"
                        mode="out-in"
                        appear
                    >
                        <component :is="Component"/>
                    </transition>
                </template>
            </router-view>
        </view>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

defineOptions({
    name:'tabsView'
})

const route = useRoute();
const router = useRouter();

</script>

<style lang="less" scoped>
.tabs-view {

    .tabs-view-content {
        /* height: calc(100vh - #{$header-height}); */
        //height: calc(100vh - 110px);
        //padding: 20px 14px 0;
        //overflow: auto;
    }

}
</style>
