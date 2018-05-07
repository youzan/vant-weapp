const TOAST_CONFIG_KEY = 'zanui.__zanToastPageConfig';

let timeoutData = {
  timeoutId: 0,
  toastCtx: null
};

let globalToastUserConfig = {};

// 获取页面上下文
function getPageCtx(pageCtx) {
  let ctx = pageCtx;

  if (!ctx) {
    const pages = getCurrentPages();
    ctx = pages[pages.length - 1];
  }

  return ctx;
}

// 处理 toast 参数格式化
function parseToastOptions(options, pageCtx) {

}

// Toast 显示函数
function Toast(options = {}, pageCtx) {
  let ctx = getPageCtx(pageCtx);
  const pageToastUserSetting = (ctx.data.zanui || {}).__zanToastPageConfig || {}
  const parsedOptions = {
    ...globalToastUserConfig,
    ...pageToastUserSetting,
    options
  };
  const toastCtx = ctx.selectComponent(parsedOptions.selector);

  if (!toastCtx) {
    console.error('无法找到对应的toast组件，请于页面中注册并在 wxml 中声明 toast 自定义组件');
    return;
  }

  if (timeoutData.timeoutId) {
    Toast.clear();
  }

  toastCtx.show({
    ...parsedOptions,
    show: true
  });

  const timeoutId = setTimeout(() => {
    toastCtx.clear();
  }, parsedOptions.timeout || 3000);

  timeoutData = {
    timeoutId,
    toastCtx
  };
}

// 设置 toast 基础属性
Toast.setDefaultOptions = function (options = {}, type = 'global') {
  const parsedDefaultOptions = {
    selector: options.selector || '',
    type: options.type || '',
    icon: options.icon || '',
    image: options.image || '',
    timeout: options.timeout || 3000
  };

  if (type === 'global') {
    globalToastUserConfig = {
      ...parsedDefaultOptions
    };
  } else {
    let ctx = getPageCtx();
    ctx.setData({
      [`${TOAST_CONFIG_KEY}`]: parsedDefaultOptions
    });
  }
};

// 重置 toast 基础属性
Toast.resetDefaultOptions = function (type = 'global') {
  if (type === 'global') {
    globalToastUserConfig = {};
  } else {
    let ctx = getPageCtx();
    ctx.setData({
      [`${TOAST_CONFIG_KEY}`]: {}
    });
  }
};

// 清理所有 toast
Toast.clear = function () {
  clearTimeout(timeoutData.timeoutId);

  try {
    timeoutData.toastCtx && timeoutData.toastCtx.clear();
  } catch (e) {
    console.log(e);
  }

  timeoutData = {
    timeoutId: 0,
    toastCtx: null
  };
};

// 显示 loading
Toast.loading = function (options = {}) {
  Toast({
    ...options,
    type: 'loading'
  });
};

module.exports = Toast;
