import { defineStore } from 'pinia';
import { store } from '@/store';
import { Storage } from '@/utils/Storage';
import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum';
import { login } from '@/api/login';
// import { generatorDynamicRouter } from "../../router/generatorRouter";


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
                // const { data } = await login(params);
                // this.setToken(data.token);
                return this.afterLogin();
            } catch (error) {
                return Promise.reject(error)
            }
        },

        async afterLogin() {
            try {

                // const [userInfo, { perms, menus }] = await Promise.all([getInfo(), permmenu()]);
                const menus = [
                    {
                        "createdAt": "2020-08-28 10:09:26",
                        "updatedAt": "2021-12-08 14:51:06",
                        "id": 1,
                        "parentId": null,
                        "name": "team",
                        "router": "/team",
                        "perms": null,
                        "type": 0,
                        "icon": "icon-shezhi",
                        "orderNum": 255,
                        "viewPath": null,
                        "keepalive": true,
                        "isShow": true,
                        "isExt": false,
                        "openMode": 1
                    },
                    {
                        "createdAt": "2020-10-19 03:07:18",
                        "updatedAt": "2023-06-11 10:17:23",
                        "id": 2,
                        "parentId": 1,
                        "name": "team1",
                        "router": "/team/team1",
                        "perms": null,
                        "type": 1,
                        "icon": "icon-rizhi1",
                        "orderNum": 0,
                        "viewPath": "/team/team1.vue",
                        "keepalive": true,
                        "isShow": true,
                        "isExt": false,
                        "openMode": 1
                    }
                ]
                // this.perms = perms;
                // this.name = userInfo.name;
                // this.avatar = userInfo.headImg;
                // this.userInfo = userInfo;
                // 生成路由
                const generatorResult  = await generatorDynamicRouter(menus);
                this.menus = generatorResult.menus.filter((item) => !item.meta?.hideInMenu)

                return { menus, perms, userInfo };
            } catch (error) {
                return Promise.reject(error);
            }
        },

        async logout() {
            // await logout()
            // const wsStore = useWsStore();
            // wsStore.closeSocket();
            this.resetToken();
            resetRouter();
        }
    }
})

// 在组件setup函数外使用
export function useUserStoreWithOut() {
    return useUserStore(store);
}