// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

export function isPlainObject(val: unknown): val is Record<string, unknown> {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}

export function isPromise<T = unknown>(val: unknown): val is Promise<T> {
  return isPlainObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function isDef(value: unknown): boolean {
  return value !== undefined && value !== null;
}

export function isObj(x: unknown): x is Record<string, unknown> {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

export function isNumber(value: string) {
  return /^\d+(\.\d+)?$/.test(value);
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv)/i;

export function isImageUrl(url: string): boolean {
  return IMAGE_REGEXP.test(url);
}

export function isVideoUrl(url: string): boolean {
  return VIDEO_REGEXP.test(url);
}
