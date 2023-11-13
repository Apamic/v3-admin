import axios from 'axios'
import {Storage} from '@/utils/storage'
import { message as $message } from 'ant-design-vue';
import {uniqueSlash} from './urlUtils'

const UNKNOWN_ERROR = '未知错误，请重试'

const baseApiUrl = ''
const baseMockUrl = ''


const service = axios.create({
    baseURL: 'http://job1016.000webhostapp.com',
    timeout: 6000
});

service.interceptors.request.use(
    (config) => {
        const token = Storage.get('TOKEN_KEY');

        if (token && config.headers) {
            config.headers['Authorization'] = token;
        }

        return config
    },
    (err) => {
        Promise.reject(err);
    }
);

service.interceptors.response.use(
    (response) => {
        const res = response.data

        if (res.code !== 200) {

            $message.error(res.message || UNKNOWN_ERROR);

            // Illegal token
            if (res.code === 11001 || res.code === 11002 ) {
                window.localStorage.clear();
                window.location.reload();
            }

            const error = new Error(res.message || UNKNOWN_ERROR)
            error.code = res.code

        } else {
            return res;
        }
    },
    (error) => {
        // 处理 422 或者 500 的错误异常提示
        const errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR;
        $message.error({content: errMsg, key: errMsg});
        error.message = errMsg;
        return Promise.reject(error)
    }
);

export const request = async (config,options = {})=> {
  try {
      /** 当前接口权限, 不需要鉴权的接口请忽略， 格式：sys:user:add */
      /** permCode*/
      /** 是否直接获取data，而忽略message等 */
      /**isGetDataDirectly*/
      /** 请求成功是提示信息 */
      /**successMsg*/
      /** 请求失败是提示信息 */
      /**errorMsg */
      /** 是否mock数据请求 */
      /**isMock */
      const { successMsg, errorMsg, permCode, isMock, isGetDataDirectly = true } = options;
      if (permCode) {
          return $message.error('你没有访问该接口的权限，请联系管理员！');
      }
      const fullUrl = `${(isMock ? baseMockUrl : baseApiUrl) + config.url}`;
      config.url = uniqueSlash(fullUrl);

      const res = await service.request(config)
      successMsg && $message.success(successMsg);
      errorMsg && $message.error(errorMsg);
      return isGetDataDirectly ? res.data : res;
  } catch(error) {
      return Promise.reject(error)
  }
};



