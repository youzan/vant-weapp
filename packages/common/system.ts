interface WxWorkEnvironment {
  environment?: 'wxwork';
}

type SystemInfo = WechatMiniprogram.SystemInfo & WxWorkEnvironment;
type DeviceInfo = (
  | WechatMiniprogram.DeviceInfo
  | WechatMiniprogram.SystemInfo
) &
  WxWorkEnvironment;

let systemInfo: SystemInfo;
let appBaseInfo: WechatMiniprogram.AppBaseInfo | SystemInfo;
let deviceInfo: DeviceInfo;

export function getSystemInfoSync() {
  if (systemInfo == null) {
    systemInfo = wx.getSystemInfoSync();
  }

  return systemInfo;
}

export function getAppBaseInfo() {
  if (appBaseInfo == null) {
    appBaseInfo =
      typeof wx.getAppBaseInfo === 'function'
        ? wx.getAppBaseInfo()
        : getSystemInfoSync();
  }

  return appBaseInfo;
}

export function getDeviceInfo() {
  if (deviceInfo == null) {
    deviceInfo =
      typeof wx.getDeviceInfo === 'function'
        ? wx.getDeviceInfo()
        : getSystemInfoSync();
  }

  return deviceInfo;
}

export function getWindowInfo() {
  return typeof wx.getWindowInfo === 'function'
    ? wx.getWindowInfo()
    : wx.getSystemInfoSync();
}
