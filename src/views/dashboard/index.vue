<template>
    <div class="view-container">
        dash board
        {{ t('common.okText')}}
<!--        {{useI18n()}}-->
<!--        {{localeList}}-->
        {{ t('layout.setting.footer')}}
        content
        <div v-for="(item,index) in 100 " style="color: rgb(34.077,34.077,34.077);">
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
import {parseQuery} from "@/utils/urlUtils";
import {pick} from "@/utils/other";
import {randomColor, randomString} from "@/utils/randoms";
import {removeTag,dayOfYear} from "@/utils/other";
import {gray} from "../../utils/other";



defineOptions({
    name: 'index'
})

const {t} = useI18n();

console.log(parseQuery('www.asadffsssf.com/?a=1&b=2'))

console.log(pick({a:1,b:2},'a'))
console.log(randomColor())
console.log(randomString())
console.log(removeTag('<div>123456</div>'))
console.log(dayOfYear(new Date(2023,10,22)))
console.log(gray(12,25,189));
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
