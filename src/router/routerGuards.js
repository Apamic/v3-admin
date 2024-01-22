import {useUserStore} from '@/store/modules/user';
import {Storage} from '@/utils/Storage';
import {LOGIN_NAME, REDIRECT_NAME} from '@/enums/routerEnum';


const defaultRoutePath = '/dashboard'

export function createRouterGuards(router, whiteNameList) {


    router.beforeEach(async (to, _, next) => {

        const userStore = useUserStore();
        const token = Storage.get(ACCESS_TOKEN_KEY, null);

        if (token) {
            if (to.name === LOGIN_NAME) {
                next({path: defaultRoutePath});
            } else {
                const hasRoute = router.hasRoute(to.name);
                if (userStore.menus.length === 0) {
                    // 从后台获取菜单
                    const [err] = await _to(userStore.afterLogin());
                    if (err) {
                        userStore.resetToken();
                        return next({name: LOGIN_NAME});
                    }
                    if (!hasRoute) {
                        // 如果该路由不存在，可能是动态注册的路由，它还没准备好，需要再重定向一次到该路由
                        next({...to, replace: true});
                    } else {
                        next()
                    }
                } else {
                    next();
                }
            }
        } else {
            // not login
            if (whiteNameList.some((n) => n === to.name)) {
                // 在免登录名单，直接进入
                next();
            } else {
                next({name: LOGIN_NAME, query: {redirect: to.fullPath}, replace: true});
            }

        }

    })


}
