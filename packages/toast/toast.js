import { isObj } from '../utils/index';

const defaultOptions = {
  type: 'text',
  mask: false,
  message: '',
  value: true,
  duration: 3000,
  position: 'middle',
  loadingType: 'circular',
  selector: '#van-toast',
  overlayStyle: {}
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

  toast.setData(options);
  clearTimeout(toast.timer);

  if (options.duration > 0) {
    toast.timer = setTimeout(() => {
      toast.clear();
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
  if (queue.length) {
    if (all) {
      queue.forEach(toast => {
        toast.clear();
      });
      queue = [];
    } else if (singleton) {
      queue[0].clear();
    } else {
      queue.shift().clear();
    }
  }
};

Toast.setDefaultOptions = options => {
  Object.assign(currentOptions, options);
};

Toast.resetDefaultOptions = () => {
  currentOptions = { ...defaultOptions };
};

export default Toast;
