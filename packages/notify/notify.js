const defaultOptions = {
  selector: '#van-notify',
  duration: 3000
};

export default function Notify(options = {}) {
  const pages = getCurrentPages();
  const ctx = pages[pages.length - 1];

  options = Object.assign({}, defaultOptions, parseParam(options));

  const el = ctx.selectComponent(options.selector);
  delete options.selector;

  if (el) {
    el.setData({
      ...options
    });
    el.show();
  }
}

function parseParam(params = '') {
  return typeof params === 'object' ? params : { text: params };
}
