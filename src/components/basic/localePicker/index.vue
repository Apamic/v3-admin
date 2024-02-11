<template>
    <Dropdown  placement="bottomRight">
        <span>{{getLocaleText}}</span>
        <template #overlay>
            <Menu :selectedKeys="selectedKeys">
                <template v-for="(item,index) in localeList" :key="item.lang">
                    <Menu.Item @click="toggleLocale(item.lang)">
                        {{item.label}}
                    </Menu.Item>
                </template>
            </Menu>
        </template>
    </Dropdown>
</template>

<script setup>
import {Dropdown,Menu} from 'ant-design-vue';
import {localeList} from '@/locales/config.js';
import {computed, unref, watchEffect,ref} from "vue";
import { useLocale } from '@/locales/useLocale';

const { changeLocale, getLocale } = useLocale();

const selectedKeys = ref([]);

watchEffect(() => {
    selectedKeys.value = [unref(getLocale)]
})

const getLocaleText = computed(() => {
    const key = selectedKeys.value[0];
    if (!key) {
        return '';
    }
    return localeList.find((item) => item.lang === key)?.lang;
})

async function toggleLocale(lang) {
    await changeLocale(lang);
    selectedKeys.value = [lang];
}

// console.log(selectedKeys.value);
// console.log(localeList)


</script>

<style scoped>

</style>
