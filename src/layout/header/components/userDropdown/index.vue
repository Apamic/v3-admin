<template>
    <Dropdown placement="bottomLeft">
        <span style="display: flex;align-items: center">
            <img style="width: 24px;height: 24px;margin-right: 12px" class="user-img" src="@/assets/vue.svg"/>
            <span>{{userInfo.name || '王磊'}}</span>
        </span>
        <template #overlay>
            <Menu>
                <Menu.Item>
                    {{ '关于' }}
                </Menu.Item>
                <Menu.Item @click="$router.push({ name: 'account-settings' })">
                    {{ '个人设置' }}
                </Menu.Item>
                <Menu.Divider ></Menu.Divider >
                <Menu.Item>
                    <div @click.prevent="onDropOut">
                        <PoweroffOutlined></PoweroffOutlined>
                        {{ '退出程序' }}
                    </div>
                </Menu.Item>
            </Menu>
        </template>
    </Dropdown>
</template>

<script lang="tsx" setup>
import {MenuUnfoldOutlined, MenuFoldOutlined,PoweroffOutlined,QuestionCircleOutlined } from '@ant-design/icons-vue';
import {useUserStore} from '@/store/modules/user.js';
import {Dropdown, Menu, message, Modal} from 'ant-design-vue';
import {computed, nextTick} from "vue";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const userInfo = computed(() => userStore.userInfo);


const onDropOut = () => {
    Modal.confirm({
        title: '您确定要退出登录吗？',
        icon: <QuestionCircleOutlined />,
        centered: true,
        onOk: async () => {
            if (userStore.userInfo.phone !== '15172364292') {
                await userStore.logout();
            }
            localStorage.clear();
            message.success('成功退出登录');
            await nextTick();
            router.replace({
                name: LOGIN_NAME,
                query: {
                    redirect: route.fullPath,
                }
            })
        }
    })
}

</script>

<style lang="less" scoped>
.user-img {
    border-radius: 50%;
}
</style>
