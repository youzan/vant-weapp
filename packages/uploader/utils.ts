interface File {
  path: string; // 上传临时地址
  url: string; // 上传临时地址
  size: number; // 上传大小
  name: string; // 上传文件名称，accept="image" 不存在
  type: string; // 上传类型，accept="image" 不存在
  time: number; // 上传时间，accept="image" 不存在
  image: boolean; // 是否为图片
}

const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;

function isImageUrl(url: string): boolean {
  return IMAGE_REGEXP.test(url);
}

export function isImageFile(item: File): boolean {
  if (item.type) {
    return item.type.indexOf('image') === 0;
  }

  if (item.path) {
    return isImageUrl(item.path);
  }

  if (item.url) {
    return isImageUrl(item.url);
  }

  return false;
}

export function isVideo(
  res: any,
  accept: string
): res is WechatMiniprogram.ChooseVideoSuccessCallbackResult {
  return accept === 'video';
}

export function chooseFile({
  accept,
  multiple,
  capture,
  compressed,
  maxDuration,
  sizeType,
  camera,
  maxCount,
}): Promise<
  | WechatMiniprogram.ChooseImageSuccessCallbackResult
  | WechatMiniprogram.ChooseMediaSuccessCallbackResult
  | WechatMiniprogram.ChooseVideoSuccessCallbackResult
  | WechatMiniprogram.ChooseMessageFileSuccessCallbackResult
> {
  switch (accept) {
    case 'image':
      return new Promise((resolve, reject) => {
        wx.chooseImage({
          count: multiple ? Math.min(maxCount, 9) : 1, // 最多可以选择的数量，如果不支持多选则数量为1
          sourceType: capture, // 选择图片的来源，相册还是相机
          sizeType,
          success: resolve,
          fail: reject,
        });
      });
    case 'media':
      return new Promise((resolve, reject) => {
        wx.chooseMedia({
          count: multiple ? Math.min(maxCount, 9) : 1, // 最多可以选择的数量，如果不支持多选则数量为1
          sourceType: capture, // 选择图片的来源，相册还是相机
          maxDuration,
          sizeType,
          camera,
          success: resolve,
          fail: reject,
        });
      });
    case 'video':
      return new Promise((resolve, reject) => {
        wx.chooseVideo({
          sourceType: capture,
          compressed,
          maxDuration,
          camera,
          success: resolve,
          fail: reject,
        });
      });
    default:
      return new Promise((resolve, reject) => {
        wx.chooseMessageFile({
          count: multiple ? maxCount : 1, // 最多可以选择的数量，如果不支持多选则数量为1
          type: 'file',
          success: resolve,
          fail: reject,
        });
      });
  }
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && typeof val === 'object';
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}
