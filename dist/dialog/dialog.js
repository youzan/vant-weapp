'use strict';

var defaultData = require('./data');

function getDialogCtx(_ref) {
  var selector = _ref.selector,
      pageCtx = _ref.pageCtx;

  var ctx = pageCtx;
  if (!ctx) {
    var pages = getCurrentPages();
    ctx = pages[pages.length - 1];
  }
  return ctx.selectComponent(selector);
}

function getParsedOptions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return Object.assign({
    // 自定义 btn 列表
    // { type: 按钮类型，回调时以此作为区分依据，text: 按钮文案, color: 按钮文字颜色 }
    buttons: []
  }, defaultData, options);
}

// options 使用参数
// pageCtx 页面 page 上下文
function Dialog(options, pageCtx) {
  var parsedOptions = getParsedOptions(options);

  var dialogCtx = getDialogCtx({
    selector: parsedOptions.selector,
    pageCtx: pageCtx
  });

  if (!dialogCtx) {
    console.error('无法找到对应的dialog组件，请于页面中注册并在 wxml 中声明 dialog 自定义组件');
    return Promise.reject({ type: 'component error' });
  }

  // 处理默认按钮的展示
  // 纵向排布确认按钮在上方
  var _parsedOptions$button = parsedOptions.buttons,
      buttons = _parsedOptions$button === undefined ? [] : _parsedOptions$button;

  var showCustomBtns = false;
  if (buttons.length === 0) {
    if (parsedOptions.showConfirmButton) {
      buttons.push({
        type: 'confirm',
        text: parsedOptions.confirmButtonText,
        color: parsedOptions.confirmButtonColor
      });
    }

    if (parsedOptions.showCancelButton) {
      var cancelButton = {
        type: 'cancel',
        text: parsedOptions.cancelButtonText,
        color: parsedOptions.cancelButtonColor
      };
      if (parsedOptions.buttonsShowVertical) {
        buttons.push(cancelButton);
      } else {
        buttons.unshift(cancelButton);
      }
    }
  } else {
    showCustomBtns = true;
  }

  return new Promise(function (resolve, reject) {
    dialogCtx.setData(Object.assign({}, parsedOptions, {
      buttons: buttons,
      showCustomBtns: showCustomBtns,
      key: '' + new Date().getTime(),
      show: true,
      promiseFunc: { resolve: resolve, reject: reject },
      openTypePromiseFunc: null
    }));
  });
}

Dialog.close = function (options, pageCtx) {
  var parsedOptions = getParsedOptions(options);

  var dialogCtx = getDialogCtx({
    selector: parsedOptions.selector,
    pageCtx: pageCtx
  });

  if (!dialogCtx) {
    return;
  }

  dialogCtx.setData({
    show: false,
    promiseFunc: null,
    openTypePromiseFunc: null
  });
};

module.exports = Dialog;