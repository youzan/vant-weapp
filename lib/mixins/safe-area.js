"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cache = null;
function getSafeArea() {
    return new Promise(function (resolve, reject) {
        if (cache != null) {
            resolve(cache);
        }
        else {
            wx.getSystemInfo({
                success: function (_a) {
                    var model = _a.model, statusBarHeight = _a.statusBarHeight;
                    var deviceType = model.replace(/\s/g, '-');
                    var iphoneNew = /iphone-x|iPhone11|iPhone12/i.test(deviceType);
                    cache = {
                        isIPhoneX: iphoneNew,
                        statusBarHeight: statusBarHeight
                    };
                    resolve(cache);
                },
                fail: reject
            });
        }
    });
}
exports.safeArea = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.safeAreaInsetBottom, safeAreaInsetBottom = _c === void 0 ? true : _c, _d = _b.safeAreaInsetTop, safeAreaInsetTop = _d === void 0 ? false : _d;
    return Behavior({
        properties: {
            safeAreaInsetTop: {
                type: Boolean,
                value: safeAreaInsetTop
            },
            safeAreaInsetBottom: {
                type: Boolean,
                value: safeAreaInsetBottom
            }
        },
        created: function () {
            var _this = this;
            getSafeArea().then(function (_a) {
                var isIPhoneX = _a.isIPhoneX, statusBarHeight = _a.statusBarHeight;
                _this.set({ isIPhoneX: isIPhoneX, statusBarHeight: statusBarHeight });
            });
        }
    });
};
