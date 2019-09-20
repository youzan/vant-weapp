"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("../common/color");
var defaultOptions = {
    selector: '#van-notify',
    type: 'danger',
    message: '',
    background: '',
    duration: 3000,
    zIndex: 110,
    color: color_1.WHITE,
    safeAreaInsetTop: false,
    onClick: function () { },
    onOpened: function () { },
    onClose: function () { }
};
function parseOptions(message) {
    return typeof message === 'string' ? { message: message } : message;
}
function getContext() {
    var pages = getCurrentPages();
    return pages[pages.length - 1];
}
function Notify(options) {
    options = Object.assign({}, defaultOptions, parseOptions(options));
    var context = options.context || getContext();
    var notify = context.selectComponent(options.selector);
    delete options.context;
    delete options.selector;
    if (notify) {
        notify.set(options);
        notify.show();
    }
    else {
        console.warn('未找到 van-notify 节点，请确认 selector 及 context 是否正确');
    }
}
exports.default = Notify;
