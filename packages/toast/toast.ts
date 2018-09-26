import { isObj } from '../common/utils';

type ToastMessage = string | number;

export type ToastOptions = {
  show?: boolean;
  type?: string;
  mask?: boolean;
  zIndex?: number;
  position?: string;
  duration?: number;
  selector?: string;
  forbidClick?: boolean;
  loadingType?: string;
  message?: ToastMessage;
}

export interface Toast {
  (message: ToastOptions | ToastMessage, options?: ToastOptions): Weapp.Component;
  loading?(options?: ToastOptions | ToastMessage): Weapp.Component;
  success?(options?: ToastOptions | ToastMessage): Weapp.Component;
  fail?(options?: ToastOptions | ToastMessage): Weapp.Component;
  clear?(): void;
  setDefaultOptions?(options: ToastOptions): void;
  resetDefaultOptions?(): void;
}

const defaultOptions = {
  type: 'text',
  mask: false,
  message: '',
  show: true,
  zIndex: 1000,
  duration: 3000,
  position: 'middle',
  forbidClick: false,
  loadingType: 'circular',
  selector: '#van-toast'
};

let queue = [];
let currentOptions: ToastOptions = { ...defaultOptions };

function parseOptions(message): ToastOptions {
  return isObj(message) ? message : { message };
}

const Toast: Toast = (options = {}) => {
  options = {
    ...currentOptions,
    ...parseOptions(options)
  } as ToastOptions;

  const pages = getCurrentPages();
  const ctx = pages[pages.length - 1];

  const toast = ctx.selectComponent(options.selector);
  delete options.selector;

  queue.push(toast);
  toast.setData(options);
  clearTimeout(toast.timer);

  if (options.duration > 0) {
    toast.timer = setTimeout(() => {
      toast.clear();
      queue = queue.filter(item => item !== toast);
    }, options.duration);
  }

  return toast;
};

const createMethod = type => options => Toast({
  type, ...parseOptions(options)
});

['loading', 'success', 'fail'].forEach(method => {
  Toast[method] = createMethod(method);
});

Toast.clear = () => {
  queue.forEach(toast => {
    toast.clear();
  });
  queue = [];
};

Toast.setDefaultOptions = options => {
  Object.assign(currentOptions, options);
};

Toast.resetDefaultOptions = () => {
  currentOptions = { ...defaultOptions };
};

export default Toast;
