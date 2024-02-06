import { useLocaleStoreWithOut } from '@/store/modules/locale';

async function createI18nOptions() {
    const localeStore = useLocaleStoreWithOut();
    const locale = localeStore.getLocale;
    const defaultLocale = await import(`./lang/${locale}.js`);
};
