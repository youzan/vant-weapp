"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setAsync(context, data) {
    return new Promise(function (resolve) {
        context.setData(data, resolve);
    });
}
exports.behavior = Behavior({
    created: function () {
        var _this = this;
        if (!this.$options) {
            return;
        }
        var cache = {};
        var computed = this.$options().computed;
        var keys = Object.keys(computed);
        this.calcComputed = function () {
            var needUpdate = {};
            keys.forEach(function (key) {
                var value = computed[key].call(_this);
                if (cache[key] !== value) {
                    cache[key] = value;
                    needUpdate[key] = value;
                }
            });
            return needUpdate;
        };
    },
    attached: function () {
        this.set();
    },
    methods: {
        // set data and set computed data
        set: function (data, callback) {
            var _this = this;
            var stack = [];
            if (data) {
                stack.push(setAsync(this, data));
            }
            if (this.calcComputed) {
                stack.push(setAsync(this, this.calcComputed()));
            }
            return Promise.all(stack).then(function (res) {
                if (callback && typeof callback === 'function') {
                    callback.call(_this);
                }
                return res;
            });
        }
    }
});
