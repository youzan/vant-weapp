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

export default function Notify(options) {
  if (options === void 0) {
    options = {};
  }

  var pages = getCurrentPages();
  var ctx = pages[pages.length - 1];
  options = Object.assign({}, defaultOptions, parseOptions(options));
  var el = ctx.selectComponent(options.selector);
  delete options.selector;

  if (el) {
    el.setData(options);
    el.show();
  }
}