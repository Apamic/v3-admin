import RouterView from '@/layout';
import router from '@/router';

const REDIRECT_NAME = 'Redirect'

/**
 * 主要用于刷新当前页面
 */
export const REDIRECT_ROUTE = {
    path: '/redirect',
    component: RouterView,
    name: 'RedirectTo',
    meta: {
        title: REDIRECT_NAME,
        hideInMenu: true,
        hideInBreadcrumb: true,
    },
    children: [
        {
            path: ':path(.*)',
            name: REDIRECT_NAME,
            component: RouterView,
            meta: {
                title: REDIRECT_NAME,
                hideInMenu: true,
            },
            beforeEnter: (to) => {
                const {params, query} = to
                const {path, redirectType = 'path'} = params;

                Reflect.deleteProperty(params, '_redirect_type');
                Reflect.deleteProperty(params, 'path');

                const _path = Array.isArray(path) ? path.join('/') : path;

                setTimeout(() => {
                    if (redirectType === 'name') {
                        router.replace({
                            name: _path,
                            query,
                            params
                        });
                    } else {
                        router.replace({
                            path: _path.startsWith('/') ? _path : `/${_path}`,
                            query,
                        });
                    }
                });
                return true;
            }
        }
    ]
}