import { createRouter,createWebHistory } from 'vue-router'

import outsideLayout from './outsideLayout'

// import Layout from '@/layout/index.vue'

export const constantRoutes = [
    {
        path: '/',
        name: 'Layout',
        redirect: '/option1',
        component: () => import('@/layout/index.vue'),
        meta: {
            title: '首页',
        },
        children: [
            {
                path: '/option1',
                name: 'option1',
                component: () => import('@/views/option1/option1.vue')
            },

            {
                path: '/team',
                name: 'team',
                children: [
                    {
                        path: '/team/team1',
                        name: 'team1',
                        component: () => import('@/views/team/team1.vue')
                    }
                ]
            },


        ],
    },

    ...outsideLayout,
]


const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes
})

export function resetRouter() {
    router.getRoutes().forEach((route) => {
        const { name } = route
        if (name && !whiteNameList.some((n) => n === name)) {
            router.hasRoute(name) && router.removeRoute(name);
        }
    })
}


export async function setupRouter(app) {
    // 创建路由守卫
    //createRouterGuards(router, whiteNameList);

    app.use(router)

    //路由准备就绪后挂载APP实例
    await router.isReady()

}




export default router
