import {isUrl} from "../utils/is";


export function filterAsyncRoute (routes,parentRoute,lastNamePath) {
    return routes
        .filter((item) => item.type !== 2 && item.isShow && item.parentId == parentRoute?.id)
        .map((item) => {
            const { router, viewPath, name, icon, orderNum, keepalive, isExt, openMode } = item;
            let fullPath = '';
            const pathPrefix = lastNamePath.at(-1) || '';
            if (isUrl(router)) {
                fullPath = router;
            } else {

            }
        })
}


export const generatorDynamicRouter = (asyncMenus) => {


}