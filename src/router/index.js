import { createRouter,createWebHistory } from 'vue-router'

import outsideLayout from './outsideLayout'

// import Layout from '@/layout/index.vue'

export const constantRoutes = [
    {
        path: '/',
        name: 'Layout',
        // redirect: '/',
        component: () => import('@/layout/index.vue'),
        meta: {
            title: '首页',
        },
        children: [],
    },

    ...outsideLayout,
]


const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes
})


export async function setupRouter(app) {
    // 创建路由守卫
    //createRouterGuards(router, whiteNameList);

    app.use(router)

    //路由准备就绪后挂载APP实例
    await router.isReady()

}




export default router
