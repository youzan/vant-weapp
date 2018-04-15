let timeoutData = {
  timeoutId: 0,
  toastCtx: null
}

function Toast(options = {}, pageCtx) {
  let ctx = pageCtx;
  if (!ctx) {
    const pages = getCurrentPages();
    ctx = pages[pages.length - 1];
  }
  const toastCtx = ctx.selectComponent(options.selector);

  if (!toastCtx) {
    console.error('无法找到对应的toast组件，请于页面中注册并在 wxml 中声明 toast 自定义组件');
    return;
  }

  if (timeoutData.timeoutId) {
    Toast.clear();
  }

  toastCtx.show({
    ...options,
    show: true
  });

  const timeoutId = setTimeout(() => {
    toastCtx.clear();
  }, options.timeout || 3000);

  timeoutData = {
    timeoutId,
    toastCtx
  }
};

// 清理所有 toast
Toast.clear = function() {
  clearTimeout(timeoutData.timeoutId);

  try {
    timeoutData.toastCtx && timeoutData.toastCtx.clear();
  } catch (e) {}

  timeoutData = {
    timeoutId: 0,
    toastCtx: null
  }
}

// 显示 loading
Toast.loading = function(options = {}) {
  Toast({
    ...options,
    type: 'loading'
  });
}

module.exports = Toast;
