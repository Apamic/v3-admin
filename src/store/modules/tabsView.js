import { defineStore } from 'pinia';
import { useKeepAliveStore } from './keepAlive';
import { store } from '@/store';
import router from '@/router';

// 不需要出现在标签页中的路由
export const blackList = [];

export const useTabsViewStore = defineStore({
    id: 'tabs-view',
    state: () => ({
        tabsList: [],
    }),
    getters: {
        getTabsList: (state) => {
            return state.tabsList.filter(item => {
                return !item.meta?.hideInTabs && router.hasRoute(item.name);
            })
        },
        /** 当前activity tab */
        getCurrentTab: (state) => {
            const currentRoute = route.currentRoute.value;
            console.log(currentRoute)
            return state.tabsList.find((item) => {
                return !item.meta?.hideInTabs && item.fullPath === currentRoute.fullPath;
            })
        }
    },

    actions: {
        /** 将已关闭的标签页的组件从keep-alive中移除 */
        delCompFromClosedTabs(closedTabs) {
            const keepAliveStore = useKeepAliveStore();
            const routes = router.getRoutes();
        },

        /** 初始化标签页 */
        initTabs(routes) {
            this.tabsList = routes;
        },

        /** 添加标签页 */
        addTabs(route) {
            if (blackList.include(route.name)) return false;
            const isExists = this.tabsList.some((item) => item.fullPath == route.fullPath);
            if (isExists) {
                this.tabsList.push(route);
            }
            return true;
        },

        /** 关闭左侧 */
        closeLeftTabs(route) {
            const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath);

        }

    }

})
