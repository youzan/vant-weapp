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

  toastCtx.show({
    ...options,
    show: true
  });

  setTimeout(() => {
    toastCtx.clear();
  }, options.timeout || 3000);
};

module.exports = Toast;
