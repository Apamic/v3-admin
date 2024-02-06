

export const loadLocalePool = [];

export function setHtmlPageLang(locale) {
    document.querySelector('html')?.setAttribute('lang',locale);
}

export function setLoadLocalePool(cb) {
    cb(loadLocalePool)
}

export function genMessage(langs,prefix = 'lang') {
    const obj = {};

    Object.keys(langs).forEach((key) => {
        const langFileModule = langs[key].default;
        let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '');
        const lastIndex = fileName.lastIndexOf('.');
        const keyList = fileName.split('/');
        const moduleName = keyList.shift();
        const objKey = keyList.join('.');

        if (moduleName) {

        } else {

        }

    });
    return obj;
}
