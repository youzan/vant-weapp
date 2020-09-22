let queue = [];

type DialogOptions = {
  lang?: string;
  show?: boolean;
  title?: string;
  width?: string | number;
  zIndex?: number;
  theme?: string;
  context?:
    | WechatMiniprogram.Page.TrivialInstance
    | WechatMiniprogram.Component.TrivialInstance;
  message?: string;
  overlay?: boolean;
  selector?: string;
  ariaLabel?: string;
  className?: string;
  customStyle?: string;
  transition?: string;
  asyncClose?: boolean;
  businessId?: number;
  sessionFrom?: string;
  overlayStyle?: string;
  appParameter?: string;
  messageAlign?: string;
  sendMessageImg?: string;
  showMessageCard?: boolean;
  sendMessagePath?: string;
  sendMessageTitle?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  closeOnClickOverlay?: boolean;
  confirmButtonOpenType?: string;
};

const defaultOptions: DialogOptions = {
  show: false,
  title: '',
  width: null,
  theme: 'default',
  message: '',
  zIndex: 100,
  overlay: true,
  selector: '#van-dialog',
  className: '',
  asyncClose: false,
  transition: 'scale',
  customStyle: '',
  messageAlign: '',
  overlayStyle: '',
  confirmButtonText: '确认',
  cancelButtonText: '取消',
  showConfirmButton: true,
  showCancelButton: false,
  closeOnClickOverlay: false,
  confirmButtonOpenType: '',
};

let currentOptions: DialogOptions = { ...defaultOptions };

function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

const Dialog = (
  options: DialogOptions
): Promise<WechatMiniprogram.Component.TrivialInstance> => {
  options = {
    ...currentOptions,
    ...options,
  };

  return new Promise((resolve, reject) => {
    const context = options.context || getContext();
    const dialog = context.selectComponent(options.selector);

    delete options.context;
    delete options.selector;

    if (dialog) {
      dialog.setData({
        onCancel: reject,
        onConfirm: resolve,
        ...options,
      });

      wx.nextTick(() => {
        dialog.setData({ show: true });
      });

      queue.push(dialog);
    } else {
      console.warn(
        '未找到 van-dialog 节点，请确认 selector 及 context 是否正确'
      );
    }
  });
};

Dialog.alert = (options: DialogOptions) => Dialog(options);

Dialog.confirm = (options: DialogOptions) =>
  Dialog({
    showCancelButton: true,
    ...options,
  });

Dialog.close = () => {
  queue.forEach((dialog) => {
    dialog.close();
  });
  queue = [];
};

Dialog.stopLoading = () => {
  queue.forEach((dialog) => {
    dialog.stopLoading();
  });
};

Dialog.currentOptions = currentOptions;
Dialog.defaultOptions = defaultOptions;

Dialog.setDefaultOptions = (options: DialogOptions) => {
  currentOptions = { ...currentOptions, ...options };
  Dialog.currentOptions = currentOptions;
};

Dialog.resetDefaultOptions = () => {
  currentOptions = { ...defaultOptions };
  Dialog.currentOptions = currentOptions;
};

Dialog.resetDefaultOptions();

export default Dialog;
