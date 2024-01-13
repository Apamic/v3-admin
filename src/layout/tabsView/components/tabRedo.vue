<template>
    <span class="redo">
        <RedoOutlined :spin="loading"/>
    </span>
</template>

<script setup>
import {defineOptions} from "vue";
import {RedoOutlined} from '@ant-design/icons-vue';


defineOptions({
    name: "tabRedo"
})

const loading = ref(false);

</script>

<style scoped>
.redo {
    display: inline-block;
    width: 36px;
    height: 30px;
    /*border-left: 1px solid var(--border-color);*/
    color: #8b949e;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
}
</style>
