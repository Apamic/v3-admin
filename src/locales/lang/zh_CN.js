import antdLocale from 'ant-design-vue/es/locale/zh_CN';
import { genMessage } from '../helper';

const modulesFiles = import.meta.glob('./zh-CN/**/*.{json,ts,js}', { eager: true });

export default {
    message: {
        ...genMessage(modulesFiles, 'zh-CN'),
        antdLocale,
    }
}
