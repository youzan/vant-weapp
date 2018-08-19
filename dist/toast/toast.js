import { isObj } from '../utils/index';

const defaultOptions = {
  type: 'text',
  mask: false,
  message: '',
  show: true,
  duration: 3000,
  position: 'middle',
  forbidClick: false,
  loadingType: 'circular',
  selector: '#van-toast'
};
const parseOptions = message => isObj(message) ? message : { message };

let queue = [];
let currentOptions = { ...defaultOptions };

function Toast(options = {}) {
  options = {
    ...currentOptions,
    ...parseOptions(options)
  };

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

Toast.clear = all => {
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
