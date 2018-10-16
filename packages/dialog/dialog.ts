let queue = [];

type DialogAction = 'confirm' | 'cancel';
type DialogOptions = {
  show?: boolean;
  title?: string;
  zIndex?: number;
  message?: string;
  overlay?: boolean;
  selector?: string;
  asyncClose?: boolean;
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

const Dialog: Dialog = options => {
  return new Promise((resolve, reject) => {
    const pages = getCurrentPages();
    const ctx = pages[pages.length - 1];

    const dialog = ctx.selectComponent(options.selector);
    delete options.selector;

    if (dialog) {
      dialog.setData({
        onCancel: reject,
        onConfirm: resolve,
        ...options
      });
      queue.push(dialog);
    }
  });
};

Dialog.defaultOptions = {
  show: true,
  title: '',
  message: '',
  zIndex: 100,
  overlay: true,
  asyncClose: false,
  selector: '#van-dialog',
  confirmButtonText: '确认',
  cancelButtonText: '取消',
  showConfirmButton: true,
  showCancelButton: false,
  closeOnClickOverlay: false,
  confirmButtonOpenType: ''
};

Dialog.alert = options =>
  Dialog({
    ...Dialog.currentOptions,
    ...options
  });

Dialog.confirm = options =>
  Dialog({
    ...Dialog.currentOptions,
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
