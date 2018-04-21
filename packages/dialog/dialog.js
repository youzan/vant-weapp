const defaultData = require('./data');

// options 使用参数
// pageCtx 页面 page 上下文
function Dialog(options, pageCtx) {
  const parsedOptions = {
    ...defaultData,
    ...options
  };

  let ctx = pageCtx;
  if (!ctx) {
    const pages = getCurrentPages();
    ctx = pages[pages.length - 1];
  }
  const dialogCtx = ctx.selectComponent(parsedOptions.selector);

  if (!dialogCtx) {
    console.error('无法找到对应的dialog组件，请于页面中注册并在 wxml 中声明 dialog 自定义组件');
    return Promise.reject({ type: 'component error' });
  }

  // 处理默认按钮的展示
  // 纵向排布确认按钮在上方
  const buttons = parsedOptions.buttons;
  let showCustomBtns = false;
  if (buttons.length === 0) {
    if (parsedOptions.showConfirmButton) {
      buttons.push({
        type: 'confirm',
        text: parsedOptions.confirmButtonText,
        color: parsedOptions.confirmButtonColor
      });
    }

    if (parsedOptions.showCancelButton) {
      const cancelButton = {
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

  return new Promise((resolve, reject) => {
    dialogCtx.setData({
      ...parsedOptions,
      buttons,
      showCustomBtns,
      key: `${(new Date()).getTime()}`,
      show: true,
      promiseFunc: { resolve, reject }
    });
  });
};

module.exports = Dialog;