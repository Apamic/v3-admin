import {LOGIN_NAME} from '@/enums/routerEnum';

export const LoginRoute = {
    path: '/login',
    name: LOGIN_NAME,
    component: () => import('@/views/login/index.vue'),
    meta: {
        title: '登录'
    }
}

export default [LoginRoute]
