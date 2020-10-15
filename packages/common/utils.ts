import { isNumber, isPlainObject } from './validator';

export function isDef(value: any): boolean {
  return value !== undefined && value !== null;
}

export function isObj(x: any): boolean {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

export function range(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export function nextTick(fn: Function) {
  setTimeout(() => {
    fn();
  }, 1000 / 30);
}

let systemInfo: WechatMiniprogram.GetSystemInfoSyncResult;
export function getSystemInfoSync() {
  if (systemInfo == null) {
    systemInfo = wx.getSystemInfoSync();
  }

  return systemInfo;
}

export function addUnit(value?: string | number): string | undefined {
  if (!isDef(value)) {
    return undefined;
  }

  value = String(value);
  return isNumber(value) ? `${value}px` : value;
}

export function requestAnimationFrame(cb: Function) {
  const systemInfo = getSystemInfoSync();

  if (systemInfo.platform === 'devtools') {
    return nextTick(cb);
  }

  return wx
    .createSelectorQuery()
    .selectViewport()
    .boundingClientRect()
    .exec(() => {
      cb();
    });
}

export function pickExclude(obj: unknown, keys: string[]) {
  if (!isPlainObject(obj)) {
    return {};
  }

  return Object.keys(obj).reduce((prev, key) => {
    if (!keys.includes(key)) {
      prev[key] = obj[key];
    }

    return prev;
  }, {});
}

export function getRect(
  this: WechatMiniprogram.Component.TrivialInstance,
  selector: string
): Promise<WechatMiniprogram.BoundingClientRectCallbackResult> {
  return new Promise((resolve) => {
    wx.createSelectorQuery()
      .in(this)
      .select(selector)
      .boundingClientRect()
      .exec((rect = []) => resolve(rect[0]));
  });
}

export function getAllRect(
  this: WechatMiniprogram.Component.TrivialInstance,
  selector: string
): Promise<WechatMiniprogram.BoundingClientRectCallbackResult[]> {
  return new Promise((resolve) => {
    wx.createSelectorQuery()
      .in(this)
      .selectAll(selector)
      .boundingClientRect()
      .exec((rect = []) => resolve(rect[0]));
  });
}
