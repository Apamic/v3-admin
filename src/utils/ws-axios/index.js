const requestBefore = Symbol('requestBefore')
const requestAfter = Symbol('requestAfter')

export class WsAxios {
    #config = {
        url: '', // 地址
        time: 3000, // 心跳间隔(毫秒)
        ping: () => ({}), // ping code,
    }
    #ws = null; // websocket示例对象
    #requestId = 0; // callbacks对象key
    #callbacks = {}; // 回调函数队列
    #lockReconnect = false; //避免重复连接
    #pingTimer = null; // 心跳包定时器
    #reconnectTimer = null; // 重连定时器

    constructor(config= this.#config) {
        Object.assign(this.#config,config)
        this.#createWebSocket()
    }

    intercepts = {
        request: (func) => {
            if (func) {
                WsAxios[requestBefore] = func;
            } else {
                WsAxios[requestBefore] = (request) => request;
            }
        },
        response: (func) => {
            if (func) {
                WsAxios[requestAfter] = func;
            } else {
                WsAxios[requestAfter] = (response) => response;
            }
        }
    };

    static [requestBefore](config) {
        return config;
    }

    static [requestAfter](response) {
        return response;
    }

    #createWebSocket() {
        this.#ws = new WebSocket(this.#config.url);
        this.#ws.open = () => {
            this.clearAllTimer();

        }
    }

    sendCommand(params) {
        const requestId = ++this.#requestId;

        params['requestId'] = requestId;


    }

    ping() {
        if (Object.keys(this.#callbacks).length === 0) {
            const messageObject = this.#config.ping();
            return this.sendCommand(messageObject);
        }
    }

    #hearBeat() {
        this.#pingTimer = setTimeout(async ()=> {
            await this.ping();
            this.#hearBeat();
        },this.#config.time)
    }

    clearAllTimer() {
        clearTimeout(this.#pingTimer);
        clearTimeout(this.#reconnectTimer);
    }

    destroyed() {
        this.clearAllTimer();
        this.#ws?.close();
    }

}