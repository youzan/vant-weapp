
function Toptips(options = {}) {
  const pages = getCurrentPages();
  const ctx = pages[pages.length - 1];
  const defaultOptions = {
    selector: '#zan-toptips',
    duration: 3000
  };

  options = Object.assign(defaultOptions, parseParam(options));

  const $toptips = ctx.selectComponent(options.selector);
  delete options.selector;

  $toptips.setData({
    ...options
  });
  $toptips && $toptips.show();
}

function parseParam(params = '') {
  return typeof params === 'object' ? params : { content: params };
}

module.exports = Toptips;