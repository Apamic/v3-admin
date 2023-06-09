import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'  //自动按需引入 需要AntDesign版本兼容
import Components from 'unplugin-vue-components/vite' //自动按需引入

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()]
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
  build:{
    minify: 'terser',
    terserOptions: {
    compress: {
      drop_console: true,
          drop_debugger: true
    }
  }
}

})
