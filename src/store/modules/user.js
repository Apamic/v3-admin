import {defineStore} from 'pinia';
import {store} from '@/store';
import {Storage} from '@/utils/Storage';
import {ACCESS_TOKEN_KEY} from '@/enums/cacheEnum';
import {login} from '@/api/login';
import {getInfo, permmenu} from '@/api/account'

// import { generatorDynamicRouter } from "../../router/generatorRouter";


export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        token: Storage.get(ACCESS_TOKEN_KEY, null),
        name: 'amdin',
        avatar: '',
        perms: [],
        menus: [],
        userInfo: {
            name: '王磊'
        },
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
                const {data} = await login(params);
                this.setToken(data.token);
                return this.afterLogin();
            } catch (error) {
                return Promise.reject(error)
            }
        },

        async afterLogin() {
            try {
                // debugger
                const [userInfo, {perms, menus}] = await Promise.all([getInfo(), permmenu()]);
                // const menus = [
                //     {
                //         "id": 1,
                //         "parentId": null,
                //         "name": "仪表盘",
                //         "router": "/dashboard",
                //         "perms": null,
                //         "type": 1,
                //         "icon": "",
                //         "orderNum": 0,
                //         "viewPath": 'dashboard/index.vue',
                //         "keepalive": false,
                //         "isShow": true,
                //         "isExt": false,
                //         "openMode": 1
                //     },
                //     {
                //         "id": 2,
                //         "parentId": null,
                //         "name": "选项",
                //         "router": "/option",
                //         "perms": null,
                //         "type": 1,
                //         "icon": "",
                //         "orderNum": 0,
                //         "viewPath": "option/option.vue",
                //         "keepalive": false,
                //         "isShow": true,
                //         "isExt": false,
                //         "openMode": 1
                //     },
                //     {
                //         "id": 3,
                //         "parentId": null,
                //         "name": "团队",
                //         "router": "/team/team1",
                //         "perms": null,
                //         "type": 0,
                //         "icon": "",
                //         "orderNum": 0,
                //         "viewPath": "",
                //         "keepalive": false,
                //         "isShow": true,
                //         "isExt": false,
                //         "openMode": 1
                //     },
                //     {
                //         "id": 4,
                //         "parentId": 3,
                //         "name": "团队1",
                //         "router": "/team",
                //         "perms": null,
                //         "type": 1,
                //         "icon": "",
                //         "orderNum": 0,
                //         "viewPath": "team/team1.vue",
                //         "keepalive": false,
                //         "isShow": true,
                //         "isExt": false,
                //         "openMode": 1
                //     },
                //     {
                //         "id": 5,
                //         "parentId": 3,
                //         "name": "团队2",
                //         "router": "/team/team2",
                //         "perms": null,
                //         "type": 0,
                //         "icon": "",
                //         "orderNum": 0,
                //         "viewPath": "",
                //         "keepalive": false,
                //         "isShow": true,
                //         "isExt": false,
                //         "openMode": 1
                //     },
                //         "id": 6,
                //         "parentId": 5,
                //         "name": "团队22",
                //         "router": "/team/team2/team22",
                //         "perms": null,
                //         "type": 1,
                //         "icon": "",
                //         "orderNum": 0,
                //         "viewPath": "team/team22.vue",
                //         "keepalive": false,
                //         "isShow": true,
                //         "isExt": false,
                //         "openMode": 1
                //     }
                // ]
                this.perms = perms;
                this.name = userInfo.name;
                this.avatar = userInfo.headImg;
                this.userInfo = userInfo;
                // 生成路由
                // const generatorResult  = await generatorDynamicRouter(menus);
                // this.menus = generatorResult.menus.filter((item) => !item.meta?.hideInMenu)

                return {menus, perms, userInfo};
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
