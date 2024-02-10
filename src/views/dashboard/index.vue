<template>
    <div class="view-container">
        dash board
        {{ t('common.okText')}}
        {{useI18n()}}
<!--        {{localeList}}-->
        content
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

console.log(useI18n().message)

const {t} = useI18n();

const selectedKeys = ref([]);

const { changeLocale, getLocale } = useLocale();

const getLocaleText = computed(() => {
    const key = selectedKeys.value[0];
    if (!key) {
        return '';
    }
    return localeList.find((item) => item.lang === key)?.label;
});

watchEffect(() => {
    selectedKeys.value = [unref(getLocale)];
});

async function toggleLocale(lang) {
    await changeLocale(lang );
    selectedKeys.value = [lang ];
    props.reload && location.reload();
}

function handleMenuClick({ key }) {
    if (unref(getLocale) === key) {
        return;
    }
    toggleLocale(key);
}

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
