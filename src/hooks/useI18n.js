import { i18n } from '@/locales/setupI18n';


function getKey(namespace,key) {
    if (!namespace) {
        return key;
    }

    if (key.startsWith(namespace)) {
        return key;
    }

    return `${namespace}.${key}`;
}

export function useI18n(namespace) {
    const normalFn = {
        t: (key) =>  {
            return getKey(namespace,key);
        }
    };

    if (!i18n) {
        return normalFn;
    }

    const { t, ...methods } = i18n.global;

    const tFn  = (key,...arg) => {
        if (!key) return '';
        if (!key.includes('.') && !namespace) return key;

        return (t)(
            getKey(namespace, key),
            ...arg
        )
    }

}


// 主要用于配合vscode i18nn ally插件的提示。此功能仅用于路由和菜单。请在其他地方使用 vue-i18n 的 useI18n
export const t = (key) => key;
