const TOAST_CONFIG_KEY = 'zanui.__zanToastPageConfig';
const DEFAULT_SHOW_TOAST_TIME = 3000;

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

// 获取当前页面的 toast 配置数据
function getPageToastConfig(pageCtx) {
  const zanuiData = pageCtx.data.zanui || {};
  return zanuiData.__zanToastPageConfig || {};
}

// Toast 显示函数
function Toast(optionsOrMsg, pageCtx) {
  // 参数格式化处理
  // 如果是文字，默认为 message
  let options = optionsOrMsg || {};
  if (typeof optionsOrMsg === 'string') {
    options = { message: optionsOrMsg };
  }

  let ctx = getPageCtx(pageCtx);
  const pageToastUserSetting = getPageToastConfig(ctx);
  const parsedOptions = {
    ...globalToastUserConfig,
    ...pageToastUserSetting,
    ...options
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

  let timeoutId = 0;
  // toast 计时，如果小于0，就不会去关闭。
  // 如果不传，就取默认值
  const timeoutOption = parsedOptions.timeout || DEFAULT_SHOW_TOAST_TIME;
  if (timeoutOption >= 0) {
    timeoutId = setTimeout(() => {
      toastCtx.clear();
    }, timeoutOption);
  }


  timeoutData = {
    timeoutId,
    toastCtx
  };
}

// 设置 toast 基础属性
Toast.setDefaultOptions = function (options = {}, type = 'page') {
  const parsedDefaultOptions = {
    selector: options.selector || '',
    type: options.type || '',
    icon: options.icon || '',
    image: options.image || '',
    timeout: options.timeout || DEFAULT_SHOW_TOAST_TIME
  };

  if (type === 'global') {
    globalToastUserConfig = {
      ...parsedDefaultOptions
    };
  } else if (type === 'page') {
    let ctx = getPageCtx();
    ctx.setData({
      [`${TOAST_CONFIG_KEY}`]: parsedDefaultOptions
    });
  }
};

// 重置 toast 基础属性
Toast.resetDefaultOptions = function (type = 'page') {
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
