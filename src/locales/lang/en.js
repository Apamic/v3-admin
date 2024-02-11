import antdLocale from 'ant-design-vue/es/locale/en_US';
import { genMessage } from '../helper';

const modulesFiles = import.meta.glob('./en/**/*.{json,ts,js}',{ eager: true });

export default {
    message: {
        ...genMessage(modulesFiles,'en'),
        antdLocale,
    },
    dateLocale: null,
    dateLocaleName: 'en',
}
