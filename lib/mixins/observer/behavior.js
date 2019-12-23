"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.behavior = Behavior({
    methods: {
        set: function (data, callback) {
            this.setData(data, callback);
            return new Promise(function (resolve) { return wx.nextTick(resolve); });
        }
    }
});
