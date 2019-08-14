function setAsync(context, data) {
    return new Promise(resolve => {
        context.setData(data, resolve);
    });
}
export const behavior = Behavior({
    created() {
        if (!this.$options) {
            return;
        }
        const cache = {};
        const { computed } = this.$options();
        const keys = Object.keys(computed);
        this.calcComputed = () => {
            const needUpdate = {};
            keys.forEach(key => {
                const value = computed[key].call(this);
                if (cache[key] !== value) {
                    cache[key] = value;
                    needUpdate[key] = value;
                }
            });
            return needUpdate;
        };
    },
    attached() {
        this.set();
    },
    methods: {
        // set data and set computed data
        set(data, callback) {
            const stack = [];
            if (data) {
                stack.push(setAsync(this, data));
            }
            if (this.calcComputed) {
                stack.push(setAsync(this, this.calcComputed()));
            }
            return Promise.all(stack).then(res => {
                if (callback && typeof callback === 'function') {
                    callback.call(this);
                }
                return res;
            });
        }
    }
});
