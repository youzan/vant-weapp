let queue = [];

type DialogAction = 'confirm' | 'cancel';
type DialogOptions = {
  lang?: string;
  show?: boolean;
  title?: string;
  width?: string | number;
  zIndex?: number;
  context?: WechatMiniprogram.Page.TrivialInstance | WechatMiniprogram.Component.TrivialInstance;
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
}

interface Dialog {
  (options: DialogOptions): Promise<DialogAction>;
  alert?: (options: DialogOptions) => Promise<DialogAction>;
  confirm?: (options: DialogOptions) => Promise<DialogAction>;
  close?: () => void;
  stopLoading?: () => void;
  install?: () => void;
  setDefaultOptions?: (options: DialogOptions) => void;
  resetDefaultOptions?: () => void;
  defaultOptions?: DialogOptions;
  currentOptions?: DialogOptions;
}

function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

const Dialog: Dialog = options => {
  options = {
    ...Dialog.currentOptions,
    ...options
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
        ...options
      });
      queue.push(dialog);
    } else {
      console.warn('未找到 van-dialog 节点，请确认 selector 及 context 是否正确');
    }
  });
};

Dialog.defaultOptions = {
  show: true,
  title: '',
  width: null,
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
  confirmButtonOpenType: ''
};

Dialog.alert = Dialog;

Dialog.confirm = options =>
  Dialog({
    showCancelButton: true,
    ...options
  });

Dialog.close = () => {
  queue.forEach(dialog => {
    dialog.close();
  });
  queue = [];
};

Dialog.stopLoading = () => {
  queue.forEach(dialog => {
    dialog.stopLoading();
  });
};

Dialog.setDefaultOptions = options => {
  Object.assign(Dialog.currentOptions, options);
};

Dialog.resetDefaultOptions = () => {
  Dialog.currentOptions = { ...Dialog.defaultOptions };
};

Dialog.resetDefaultOptions();

export default Dialog;
