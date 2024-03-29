const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

export const createStorage = (prefixKey = '', storage = localStorage) => {

    const Storage = class {
        constructor() {
            this.storage = storage;
            this.prefixKey = prefixKey;
        }

        getKey(key) {
            return `${this.prefixKey}${key}`.toUpperCase();
        }

        set(key,value,expire = DEFAULT_CACHE_TIME) {
            const stringData = JSON.stringify({
                value,
                expire: expire !== null ? new Date().getTime() + expire * 1000 : null
            })
            this.storage.setItem(this.getKey(key), stringData);
        }

        get(key,def = null) {
            const item = this.storage.getItem(this.getKey(key));
            if (item) {
                try {
                    const data = JSON.parse(item);
                    const { value , expire} = data;

                    if (expire === null || expire >= Date.now()) {
                        return value
                    }
                    this.remove(this.getKey(key))
                } catch (e) {
                    return def;
                }
            }
        }

        remove(key) {
            console.log(key, 'remove')
            this.storage.removeItem(key)
        }

        clear() {
            this.storage.clear()
        }


        setCookie(name,value,expire = DEFAULT_CACHE_TIME) {
            document.cookie = `${this.getKey(name)}=${value};Max-Age=${expire}`;
        }

        getCookie(name) {
            const cookieArr = document.cookie.split(';');
            for (let i = 0;i < cookieArr.length; i++) {
                const kv = cookieArr[i].split('=');
                if (kv[0] === this.getKey(name)) {
                    return kv[1];
                }
            }
            return '';
        }

        removeCookie(key) {
            this.setCookie(key,1,-1)
        }

        clearCookie() {
            const keys = document.cookie.match(/[^ =;]+(?==)/g);
            if (keys) {
                for (let i = keys.length; i--; ) {
                    document.cookie = `${keys[i]}=0;expire=${new Date(0).toUTCString()}`;
                }
            }
        }
    }

    return new Storage();
};

export const Storage = createStorage();

// default export Storage



