<template>
    <span class="redo" @click="handleRedo">
        <RedoOutlined :spin="loading"/>
    </span>
</template>

<script setup>
import {defineOptions, ref, unref} from "vue";
import {RedoOutlined} from '@ant-design/icons-vue';
import {useRoute, useRouter} from "vue-router";
import { REDIRECT_NAME } from '@/enums/routerEnum';

defineOptions({
    name: "tabRedo"
})
const route = useRoute();
const router = useRouter();

const handleRedo = () => {
    loading.value = true;

    router.replace({
        name: REDIRECT_NAME,
        params: {
            path: unref(route).fullPath,
        },
    });

    setTimeout(() => {
        loading.value = false;
        // Animation execution time
    }, 1200);
}

const loading = ref(false);




</script>

<style scoped>
.redo {
    display: inline-block;
    width: 36px;
    height: 30px;
    border-left: 1px solid #eee;
    color: #8b949e;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
}
</style>
