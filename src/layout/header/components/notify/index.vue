<template>
    <div class="">
        <Popover>
            <Badge :count="count" dot :numberStyle="numberStyle">
                <BellOutlined />
            </Badge>
        </Popover>


    </div>
</template>

<script setup>
import { BellOutlined } from '@ant-design/icons-vue';
import { Popover, Tabs, Badge } from 'ant-design-vue';
import {computed} from "vue";


const numberStyle = {};

const count = computed(() => {
    let count = 1;


    return count;
})

</script>

<style scoped>

</style>
