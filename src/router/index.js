import { createRouter,createWebHistory } from 'vue-router'

import outsideLayout from './outsideLayout'

// import Layout from '@/layout/index.vue'

export const constantRoutes = [
    {
        path: '/',
        name: 'Layout',
        redirect: '/dashboard',
        component: () => import('@/layout/index.vue'),
        meta: {
            title: '首页',
        },
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                component: () => import('@/views/dashboard/index.vue'),
                meta: {
                    title: 'dashboard',
                    type: 1
                }
            },
            {
                path: '/option',
                name: 'option',
                component: () => import('@/views/option/option.vue'),
                meta: {
                    title: 'option',
                    type: 1
                }
            },
            {
                path: '/team',
                name: 'team',
                meta: {
                    type: 0,
                    title: 'team',
                },
                children: [
                    {
                        path: '/team/team1',
                        name: 'team1',
                        component: () => import('@/views/team/team1.vue'),
                        meta: {
                            title: 'team1',
                            type: 1
                        }
                    },
                    {
                        path: '/team/team2',
                        name: 'team2',
                        meta: {
                            title: 'team2',
                            type: 0
                        },
                        children: [
                            {
                                path: '/team/team2/team22',
                                name: 'team22',
                                component: () => import('@/views/team/team22.vue'),
                                meta: {
                                    title: 'team22',
                                    type: 1
                                }
                            }
                        ]
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
