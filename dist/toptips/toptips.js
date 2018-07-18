'use strict';

function Toptips() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var pages = getCurrentPages();
  var ctx = pages[pages.length - 1];
  var defaultOptions = {
    selector: '#zan-toptips',
    duration: 3000
  };

  options = Object.assign(defaultOptions, parseParam(options));

  var $toptips = ctx.selectComponent(options.selector);
  delete options.selector;

  $toptips.setData(Object.assign({}, options));
  $toptips && $toptips.show();
}

function parseParam() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return typeof params === 'object' ? params : { content: params };
}

module.exports = Toptips;