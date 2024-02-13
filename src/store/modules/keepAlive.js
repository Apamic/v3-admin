import { defineStore } from 'pinia';
import { store } from '@/store';
import {useTabsViewStoreWithOut} from './tabsView'

// const tabsViewStore = useTabsViewStoreWithOut();
// const tabsList = tabsViewStore.getTabsList;

// console.log(tabsViewStore.getTabsList,'tabsViewStore')

export const useKeepAliveStore = defineStore({
    id: 'keep-alive',

    state: () => ({
        list: [],
    }),

    actions: {
        update(tabsList) {
            const keepAliveList = [];
            for (const tab of tabsList) {

                const needCache = !tab.meta?.keepAlive;
                if (!needCache) {
                    continue;
                }
                const name = tab.name;
                keepAliveList.push(name);
            }
            this.list = keepAliveList;
        },

        add(name) {
            if (typeof name === 'string') {
                !this.list.includes(name) && this.list.push(name);
            } else {
                name.map((v) => {
                    v && !this.list.includes(v) && this.list.push(v);
                });
            }
        },

        remove(name) {
            if (typeof name === 'string') {
                this.list = this.list.filter((v) => {
                    return v !== name;
                });
            } else {
                this.list = this.list.filter((v) => {
                    return !name.includes(v);
                })
            }
        },

        clear() {
            this.list = new Set();
        },
    }
});

// 在组件setup函数外使用
export function useKeepAliveStoreWithOut() {
    return useKeepAliveStore(store);
}
