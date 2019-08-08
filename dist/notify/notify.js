import { isObj } from '../common/utils';
const defaultOptions = {
    selector: '#van-notify',
    duration: 3000
};
function parseOptions(text) {
    return isObj(text) ? text : { text };
}
function getContext() {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
}
export default function Notify(options) {
    options = Object.assign({}, defaultOptions, parseOptions(options));
    const context = options.context || getContext();
    const notify = context.selectComponent(options.selector);
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
