<template>
    <div class="view-container">
        dash board
        {{ t('common.okText')}}
<!--        {{useI18n()}}-->
<!--        {{localeList}}-->
        {{ t('layout.setting.footer')}}
        content
        <div v-for="(item,index) in 100 ">
            {{index}}
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect, unref, computed } from 'vue';
import {defineOptions} from "vue";
import { useI18n } from '@/hooks/useI18n';
import {localeList } from '@/locales/config';
import { useLocale } from '@/locales/useLocale';

defineOptions({
    name: 'index'
})

const {t} = useI18n();


// console.log(import.meta.env)
// console.log(__APP_INFO__)
</script>

<style lang="less" scoped>
.box {

    img {
        flex: 1;
        min-height: 0;
    }

    .ant-form {
        flex: 2;
    }
}
</style>
