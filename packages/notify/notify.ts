import { isObj } from '../common/utils';

type NotifyOptions = {
  selector?: string;
  duration?: number;
}

const defaultOptions = {
  selector: '#van-notify',
  duration: 3000
};

function parseOptions(text) {
  return isObj(text) ? text : { text };
}

export default function Notify(options: NotifyOptions = {}) {
  const pages = getCurrentPages();
  const ctx = pages[pages.length - 1];

  options = Object.assign({}, defaultOptions, parseOptions(options));

  const el = ctx.selectComponent(options.selector);
  delete options.selector;

  if (el) {
    el.setData(options);
    el.show();
  }
}
