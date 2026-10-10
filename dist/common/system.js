let systemInfo;
let appBaseInfo;
let deviceInfo;
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
