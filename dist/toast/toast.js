'use strict';

var TOAST_CONFIG_KEY = 'zanui.__zanToastPageConfig';
var DEFAULT_SHOW_TOAST_TIME = 3000;

var timeoutData = {
  timeoutId: 0,
  toastCtx: null
};

var globalToastUserConfig = {};

// 获取页面上下文
function getPageCtx(pageCtx) {
  var ctx = pageCtx;

  if (!ctx) {
    var pages = getCurrentPages();
    ctx = pages[pages.length - 1];
  }

  return ctx;
}

// 获取当前页面的 toast 配置数据
function getPageToastConfig(pageCtx) {
  var zanuiData = pageCtx.data.zanui || {};
  return zanuiData.__zanToastPageConfig || {};
}

// Toast 显示函数
function Toast(optionsOrMsg, pageCtx) {
  // 参数格式化处理
  // 如果是文字，默认为 message
  var options = optionsOrMsg || {};
  if (typeof optionsOrMsg === 'string') {
    options = { message: optionsOrMsg };
  }

  var ctx = getPageCtx(pageCtx);
  var pageToastUserSetting = getPageToastConfig(ctx);
  var parsedOptions = Object.assign({}, globalToastUserConfig, pageToastUserSetting, options);
  var toastCtx = ctx.selectComponent(parsedOptions.selector);

  if (!toastCtx) {
    console.error('无法找到对应的toast组件，请于页面中注册并在 wxml 中声明 toast 自定义组件');
    return;
  }

  if (timeoutData.timeoutId) {
    Toast.clear();
  }

  toastCtx.show(Object.assign({}, parsedOptions, {
    show: true
  }));

  var timeoutId = 0;
  // toast 计时，如果小于0，就不会去关闭。
  // 如果不传，就取默认值
  var timeoutOption = parsedOptions.timeout || DEFAULT_SHOW_TOAST_TIME;
  if (timeoutOption >= 0) {
    timeoutId = setTimeout(function () {
      toastCtx.clear();
    }, timeoutOption);
  }

  timeoutData = {
    timeoutId: timeoutId,
    toastCtx: toastCtx
  };
}

// 设置 toast 基础属性
Toast.setDefaultOptions = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'page';

  var parsedDefaultOptions = {
    selector: options.selector || '',
    type: options.type || '',
    icon: options.icon || '',
    image: options.image || '',
    timeout: options.timeout || DEFAULT_SHOW_TOAST_TIME
  };

  if (type === 'global') {
    globalToastUserConfig = Object.assign({}, parsedDefaultOptions);
  } else if (type === 'page') {
    var _ctx$setData;

    var ctx = getPageCtx();
    ctx.setData((_ctx$setData = {}, _ctx$setData['' + TOAST_CONFIG_KEY] = parsedDefaultOptions, _ctx$setData));
  }
};

// 重置 toast 基础属性
Toast.resetDefaultOptions = function () {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'page';

  if (type === 'global') {
    globalToastUserConfig = {};
  } else {
    var _ctx$setData2;

    var ctx = getPageCtx();
    ctx.setData((_ctx$setData2 = {}, _ctx$setData2['' + TOAST_CONFIG_KEY] = {}, _ctx$setData2));
  }
};

// 清理所有 toast
Toast.clear = function () {
  clearTimeout(timeoutData.timeoutId);

  try {
    timeoutData.toastCtx && timeoutData.toastCtx.clear();
  } catch (e) {}

  timeoutData = {
    timeoutId: 0,
    toastCtx: null
  };
};

// 显示 loading
Toast.loading = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  Toast(Object.assign({}, options, {
    type: 'loading'
  }));
};

module.exports = Toast;