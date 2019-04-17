import { isObj } from '../common/utils';

interface NotifyOptions {
  text: string;
  color?: string;
  backgroundColor?: string;
  duration?: number;
  selector?: string;
  context?: any;
  safeAreaInsetTop?: boolean;
  zIndex?: number;
}

const defaultOptions = {
  selector: '#van-notify',
  duration: 3000
};

function parseOptions(text: NotifyOptions | string): NotifyOptions {
  return isObj(text) ? (text as NotifyOptions) : ({ text } as NotifyOptions);
}

function getContext(): Page.PageInstance {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

export default function Notify(options: NotifyOptions | string) {
  options = Object.assign({}, defaultOptions, parseOptions(options));

  const context = options.context || getContext();
  const notify = context.selectComponent(options.selector);
  delete options.selector;

  if (notify) {
    notify.set(options);
    notify.show();
  } else {
    console.warn('未找到 van-notify 节点，请确认 selector 及 context 是否正确');
  }
}
