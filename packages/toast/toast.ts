import { isObj } from '../common/utils';

type ToastMessage = string | number;

export type ToastOptions = {
  show?: boolean;
  type?: string;
  mask?: boolean;
  zIndex?: number;
  context?: any;
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

function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

const Toast: Toast = (options = {}) => {
  options = {
    ...currentOptions,
    ...parseOptions(options)
  } as ToastOptions;

  const context = options.context || getContext();
  const toast = context.selectComponent(options.selector);

  if (!toast) {
    console.warn('未找到 van-toast 节点，请确认 selector 及 context 是否正确');
    return;
  }

  delete options.context;
  delete options.selector;

  queue.push(toast);
  toast.set(options);
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
