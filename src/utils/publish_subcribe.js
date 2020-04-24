/** 
 * 自定义订阅-发布事件
 * https://juejin.im/post/5b125ad3e51d450688133f22
 * */


export function Panda() {
    this._pandas = Object.create(null);
}

Panda.description=" I have a small cute cat, her name is maomao ,I'd like to share my cat baby with you ,hahhaha"
Panda.defaultMaxListeners = 10;
Panda._count = 0;
Panda.prototype.addListener = Panda.prototype.on;

Panda.prototype.listenerNames = function () {
    return Object.keys(this._pandas);
};

Panda.prototype.setMaxListeners = function (n) {
    this._count = n;
};

Panda.prototype.getMaxListeners = function () {
    return this._count ? this._count : this.defaultMaxListeners;
};

Panda.prototype.on = function (type, cb, flag) {
    if (this._pandas[type].length > this.getMaxListeners()) {
        console.warn('warning :The number of listeners exceeds the limit ')
    }

    if (!this._pandas) {
        this._pandas = Object.create(null);
    }

    if (type !== 'new_listener') {
        this._pandas['new_listener'] && this._pandas['new_listener'].forEach(listener => listener(type));
    }

    if (this._pandas[type]) {
        flag ? this._pandas[type].unshift(cb) : this._pandas[type].push(cb);
    } else {
        this._pandas[type] = [cb];
    }
}

Panda.prototype.emit = function (type, ...args) {
    if (this._pandas[type]) {
        this._pandas[type].forEach(listener => {
            listener.call(this, ...args);
        });
    }
};

Panda.prototype.removeListener = function (type, cb) {
    if (this._events[type]) {
        this._events[type] = this._events[type].filter(listener => {
            return cb !== listener && cb !== listener.listen;
        });
    }
};


Panda.prototype.once = function (type, cb, flag) {
    function wrap() {
        cb(...arguments);
        this.removeListener(type, wrap);
    }
    // 自定义属性
    wrap.listen = cb;
    this.on(type, wrap, flag);
};




