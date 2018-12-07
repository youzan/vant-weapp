import { isObj } from '../common/utils';
var defaultOptions = {
  selector: '#van-notify',
  duration: 3000
};

function parseOptions(text) {
  return isObj(text) ? text : {
    text: text
  };
}

function getContext() {
  var pages = getCurrentPages();
  return pages[pages.length - 1];
}

export default function Notify(options) {
  if (options === void 0) {
    options = {};
  }

  options = Object.assign({}, defaultOptions, parseOptions(options));
  var context = options.context || getContext();
  var notify = context.selectComponent(options.selector);
  delete options.selector;

  if (notify) {
    notify.set(options);
    notify.show();
  } else {
    console.warn('未找到 van-notify 节点，请确认 selector 及 context 是否正确');
  }
}