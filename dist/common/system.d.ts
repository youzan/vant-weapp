/// <reference types="miniprogram-api-typings" />
interface WxWorkEnvironment {
    environment?: 'wxwork';
}
type SystemInfo = WechatMiniprogram.SystemInfo & WxWorkEnvironment;
type DeviceInfo = (WechatMiniprogram.DeviceInfo | WechatMiniprogram.SystemInfo) & WxWorkEnvironment;
export declare function getSystemInfoSync(): SystemInfo;
export declare function getAppBaseInfo(): SystemInfo | WechatMiniprogram.AppBaseInfo;
export declare function getDeviceInfo(): DeviceInfo;
export declare function getWindowInfo(): WechatMiniprogram.SystemInfo | WechatMiniprogram.WindowInfo;
export {};
