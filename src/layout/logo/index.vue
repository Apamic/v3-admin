<template>
    <div class="logo">
        <img src="~@/assets/vue.svg" alt=""/>
        <h2 v-show="!collapsed" class="title">梅家华</h2>
    </div>
</template>

<script setup>
defineProps({
    collapsed: {
        type: Boolean
    }
})
</script>

<style lang="less" scoped>
.logo {

    display: flex;
    align-items: center;

    height: 64px;
    padding-left: 12px;
    line-height: 64px;
    //background: rgba(255, 255, 255, 0.3);
    img {
        height: 32px;
        margin-right: 8px;
    }

    .title {

        color: #fff;

        text-align: center;

        overflow: hidden;
        white-space: nowrap;
        user-select: none;

    }
}


</style>
