/// <reference types="wechat-miniprogram" />
interface File {
  path: string;
  url: string;
  size: number;
  name: string;
  type: string;
  time: number;
  image: boolean;
}
export declare function isImageFile(item: File): boolean;
export declare function isVideo(
  res: any,
  accept: string
): res is WechatMiniprogram.ChooseVideoSuccessCallbackResult;
export declare function chooseFile({
  accept,
  multiple,
  capture,
  compressed,
  maxDuration,
  sizeType,
  camera,
  maxCount,
}: {
  accept: any;
  multiple: any;
  capture: any;
  compressed: any;
  maxDuration: any;
  sizeType: any;
  camera: any;
  maxCount: any;
}): Promise<
  | WechatMiniprogram.ChooseImageSuccessCallbackResult
  | WechatMiniprogram.ChooseMediaSuccessCallbackResult
  | WechatMiniprogram.ChooseVideoSuccessCallbackResult
  | WechatMiniprogram.ChooseMessageFileSuccessCallbackResult
>;
export declare function isFunction(val: unknown): val is Function;
export declare function isObject(val: any): val is Record<any, any>;
export declare function isPromise<T = any>(val: unknown): val is Promise<T>;
export {};
