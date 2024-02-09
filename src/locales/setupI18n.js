import { useLocaleStoreWithOut } from '@/store/modules/locale';
import {setHtmlPageLang, setLoadLocalePool} from "./helper";
import {localeMap} from './config';
import { createI18n } from 'vue-i18n';

export let i18n;

async function createI18nOptions() {
    const localeStore = useLocaleStoreWithOut();
    const locale = localeStore.getLocale;
    const defaultLocale = await import(`./lang/${locale}.js`);
    const message = defaultLocale.default?.message ?? {};

    setHtmlPageLang(locale);
    setLoadLocalePool((loadLocalePool) => {
        loadLocalePool.push(locale);
    })

    return {
        legacy: false,
        locale,
        fallbackLocale: localeMap.zh_CN,
        messages: {
            [locale]: message,
        },
        globalInjection: true,
        silentTranslationWarn: true, // true - warning off
        missingWarn: false,
        silentFallbackWarn: true,
    }
}

export async function setupI18n(app) {
    const options = await createI18nOptions();
    i18n = createI18n(options);
    app.use(i18n);
}


