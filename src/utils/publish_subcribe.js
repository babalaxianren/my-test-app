/** 自定义订阅-发布事件 */
export const wyListener = {
    list: {},
    count: 0,
    on(key, fn) {
        if (!this.list[key]) {
            this.list[key] = [];
        }
        this.list[key].push(fn);
    },
    // once(key, fn) {
    //     let fns = this.list[key];
    //     if (fns.includes(fn)) {
    //         this.remove(key, fn);
    //         return false;
    //     }
    //     if (!this.list[key]) {
    //         this.list[key] = [];
    //         this.count++;
    //     }
    //     this.list[key].push(fn);
    // },
    emit() {
        let key = [].shift.call(arguments),
            fns = this.list[key];

        if (!fns || fns.length === 0) {
            return false;
        }
        fns.forEach(fn => {
            fn.apply(this, arguments);
        });
    },
    remove(key, fn) {
        // 这回我们加入了取消订阅的方法
        let fns = this.list[key];
        // 如果缓存列表中没有函数，返回false
        if (!fns) return false;
        // 如果没有传对应函数的话
        // 就会将key值对应缓存列表中的函数都清空掉
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            // 遍历缓存列表，看看传入的fn与哪个函数相同
            // 如果相同就直接从缓存列表中删掉即可
            fns.forEach((cb, i) => {
                if (cb === fn) {
                    fns.splice(i, 1);
                }
            });
        }
    }
}
