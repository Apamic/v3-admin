<template>
    <div class="login-wrap">
        <a-form layout="horizontal" :model="state.formInline" @submit.prevent="handleSubmit">
            <a-form-item>
                <a-input v-model:value="state.formInline.username" size="large" placeholder="账号">
                    <!--            <template #prefix><user-outlined type="user" /></template>-->
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input-password
                    v-model:value="state.formInline.password"
                    size="large"
                    type="password"
                    placeholder="123456"
                    autocomplete="new-password"
                >
                    <!--            <template #prefix><lock-outlined type="user" /></template>-->
                </a-input-password>
            </a-form-item>
            <!--        <a-form-item>-->
            <!--          <a-input-->
            <!--              v-model:value="state.formInline.verifyCode"-->
            <!--              placeholder="验证码"-->
            <!--              :maxlength="4"-->
            <!--              size="large"-->
            <!--          >-->
            <!--            <template #prefix><SafetyOutlined /></template>-->
            <!--            <template #suffix>-->
            <!--              <img-->
            <!--                  :src="state.captcha"-->
            <!--                  class="absolute right-0 h-full cursor-pointer"-->
            <!--                  @click="setCaptcha"-->
            <!--              />-->
            <!--            </template>-->
            <!--          </a-input>-->
            <!--        </a-form-item>-->
            <a-form-item>
                <a-button type="primary" html-type="submit" size="large" :loading="state.loading" block>
                    登录
                </a-button>
            </a-form-item>
        </a-form>

    </div>
</template>

<script setup>
import {reactive} from 'vue';
import {message, Modal} from 'ant-design-vue';
import {useRoute, useRouter} from "vue-router";
import {useUserStore} from "../../store/modules/user";


const state = reactive({
    loading: false,
    captcha: '',
    formInline: {
        username: '',
        password: '',
        verifyCode: '',
        captchaId: '',
    },
});

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();

const handleSubmit = async () => {
    const {username, password} = state.formInline;
    console.log(username, password)

    if (username.trim() == '' || password.trim() == '') {
        return message.warning('用户名或密码不能为空！');
    }

    message.loading('登录中...', 0);
    state.loading = true;

    const data = await userStore.login(state.formInline)

    debugger
    if (data) {
        message.success('登录成功！')
        //setTimeout(() => router.replace((route.query.redirect as string) ?? '/'));
    } else {
        Modal.error({
            title: () => '提示',
            content: () => data.message,
        });
    }

    state.loading = false;
    message.destroy();
}

</script>

<style scoped>
.login-wrap {
    display: flex;
    /*width: 100vw;*/
    /*height: 100vh;*/
    padding-top: 240px;
    /*background: url('@/assets/login.svg');*/
    background-size: 100%;
    flex-direction: column;
    align-items: center;
}
</style>
