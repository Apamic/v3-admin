import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers'  //自动按需引入 需要AntDesign版本兼容
import Components from 'unplugin-vue-components/vite' //自动按需引入 ref,reactive等

import {resolve} from 'path'

import vueJsx from '@vitejs/plugin-vue-jsx';

import postcssPresetEnv from "postcss-preset-env" //自动填充浏览器前戳
import legacy from '@vitejs/plugin-legacy'; //兼容性

import dayjs from 'dayjs';
import pkg from './package.json';


const CWD = process.cwd();

const __APP_INFO__ = {
    pkg,
    lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {

    const { VITE_BASE_URL, VITE_DROP_CONSOLE } = loadEnv(mode, CWD);

    const isBuild = command === 'build';

    return {
        define: {
            __APP_INFO__: JSON.stringify(__APP_INFO__), //配置全局变量，可以在代码中使用
        },
        plugins: [
            vue(),
            vueJsx({
                // options are passed on to @vue/babel-plugin-jsx
            }),
            legacy({
                targets: ['defaults', 'not IE 11', 'chrome 79', 'maintained node versions'],
                additionalLegacyPolyfills: ['regenerator-runtime/runtime'], // 面向IE11时需要此插件
                // 根据你自己需要导入相应的polyfill:  https://github.com/vitejs/vite/tree/main/packages/plugin-legacy#polyfill-specifiers
                modernPolyfills: ['es.promise.finally', 'es/array', 'es/map', 'es/set'],
            }),
            Components({
                resolvers: [AntDesignVueResolver(
                    {
                        importStyle: false, // css in js
                    }
                )]
            })
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src')
            }
        },
        base: './', // 设置打包路径
        server: {
            port: 4000,
            open: true,
            cors: true,// 允许跨域
            //设置代理，根据我们项目实际情况配置
            // proxy: {
            //   '/api': {
            //     target: 'http://xxx.xxx.xxx.xxx:8000',
            //     changeOrigin: true,
            //     secure: false,
            //     rewrite: (path) => path.replace('/api/', '/')
            //   }
            // },
        },

        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                    additionalData: `
                    @import "@/styles/variables.less";
                  `,
                }
            },
            postcss: {
                plugins: [
                    postcssPresetEnv()
                ]
            }
        },
        optimizeDeps: { //预编译
            include: [
                'ant-design-vue/es/locale/zh_CN',
                'ant-design-vue/es/locale/en_US',
            ],
        },
        esbuild: {
            pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
            supported: {
                // https://github.com/vitejs/vite/pull/8665
                'top-level-await': true,
            },
        },
        build: {
            target: 'es2017',
            minify: 'esbuild',
            cssTarget: 'chrome79',
            chunkSizeWarningLimit: 2000,
            // minify: 'terser',
            // terserOptions: {
            //     compress: {
            //         drop_console: true,
            //         drop_debugger: true
            //     }
            // }
        }
    }
})
