/// <reference types="wechat-miniprogram" />
export declare function isDef(value: any): boolean;
export declare function isObj(x: any): boolean;
export declare function isNumber(value: any): boolean;
export declare function range(num: number, min: number, max: number): number;
export declare function nextTick(fn: Function): void;
export declare function getSystemInfoSync(): WechatMiniprogram.GetSystemInfoSyncResult;
export declare function addUnit(value?: string | number): string | undefined;
export declare function requestAnimationFrame(
  cb: Function
): void | WechatMiniprogram.NodesRef;
export declare function getRect(
  this: WechatMiniprogram.Component.TrivialInstance,
  selector: string
): Promise<WechatMiniprogram.BoundingClientRectCallbackResult>;
export declare function getAllRect(
  this: WechatMiniprogram.Component.TrivialInstance,
  selector: string
): Promise<WechatMiniprogram.BoundingClientRectCallbackResult[]>;
