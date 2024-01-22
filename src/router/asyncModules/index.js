const modulesFiles = import.meta.glob('../../views/**/*.vue');

export const asyncRoutes = Object.entries(modulesFiles).reduce(
    (routes, [url,importFn]) => {
    if (!/\/(login|components)\//.test(url)) {
        const path = url.replace('../../views/', '');
        routes[path] = importFn;
        return routes;
    }
},{})

// console.log('asyncRoutes', asyncRoutes);
