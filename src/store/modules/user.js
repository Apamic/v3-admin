import { defineStore } from 'pinia';
import { store } from '@/store';
import { Storage } from '@/utils/Storage'
import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum'


export const useUserStore = defineStore({
    id: 'user',
    state:() => ({
        token: Storage.get(ACCESS_TOKEN_KEY, null),
        name: 'amdin',
        avatar: '',
        perms: [],
        menus: [],
        userInfo: {},
    }),
    getter: {
        getToken() {
            return this.token;
        },
        getAvatar() {
            return this.avatar;
        },
        getName() {
            return this.name;
        },
        getPerms() {
            return this.perms;
        },
    },

    actions: {
        resetToken() {
            this.avatar = this.token = this.name = '';
            this.perms = [];
            this.menus = [];
            this.userInfo = {};
            Storage.clear();
        },

        setToken(token) {
            this.token = token ?? '';
            const ex = 7 * 24 * 60 * 60 * 1000;
            Storage.set(ACCESS_TOKEN_KEY, this.token, ex);
        },

        async login(params) {
            try {
                const { data } = await login(params);
                this.setToken(data.token);
                return this.afterLogin();
            } catch (error) {
                return Promise.reject(error)
            }
        },

        async afterLogin() {
            try {

                const [userInfo, { perms, menus }] = await Promise.all([getInfo(), permmenu()]);
                this.perms = perms;
                this.name = userInfo.name;
                this.avatar = userInfo.headImg;
                this.userInfo = userInfo;
                // 生成路由
                const generatorResult  = await generatorDynamicRouter(menus);
                this.menus = generatorResult.menus.filter((item) => !item.meta?.hideInMenu)

                return { menus, perms, userInfo };
            } catch (error) {
                return Promise.reject(error);
            }
        },

        async logout() {
            await logout()
            const wsStore = useWsStore();
            wsStore.closeSocket();
            this.resetToken();
            resetRouter();
        }
    }
})

// 在组件setup函数外使用
export function useUserStoreWithOut() {
    return useUserStore(store);
}