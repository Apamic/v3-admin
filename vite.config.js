import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers'  //自动按需引入 需要AntDesign版本兼容
import Components from 'unplugin-vue-components/vite' //自动按需引入 ref,reactive等

import {resolve} from 'path'

import vueJsx from '@vitejs/plugin-vue-jsx';


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx({
            // options are passed on to @vue/babel-plugin-jsx
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
        }
    },

    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        }
    }
})
