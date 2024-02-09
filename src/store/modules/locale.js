import {defineStore} from "pinia";
import { Storage } from '@/utils/Storage';
import { LOCALE_KEY } from '@/enums/cacheEnum';
import { store } from '@/store';

export const useLocaleStore  = defineStore({
    id: 'locale',
    state: () => ({
        locale: Storage.get(LOCALE_KEY,'zh_CN'),
    }),
    getters: {
        getLocale(state) {
            return state.locale ?? 'zh_CN'
        }
    },
    actions: {
        setLocale(locale) {
            this.locale = locale;
            Storage.set(LOCALE_KEY, locale);
        }
    }
});


export function useLocaleStoreWithOut() {
    return useLocaleStore(store);
}
