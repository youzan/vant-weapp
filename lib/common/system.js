"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWindowInfo = exports.getDeviceInfo = exports.getAppBaseInfo = exports.getSystemInfoSync = void 0;
var systemInfo;
var appBaseInfo;
var deviceInfo;
function getSystemInfoSync() {
    if (systemInfo == null) {
        systemInfo = wx.getSystemInfoSync();
    }
    return systemInfo;
}
exports.getSystemInfoSync = getSystemInfoSync;
function getAppBaseInfo() {
    if (appBaseInfo == null) {
        appBaseInfo =
            typeof wx.getAppBaseInfo === 'function'
                ? wx.getAppBaseInfo()
                : getSystemInfoSync();
    }
    return appBaseInfo;
}
exports.getAppBaseInfo = getAppBaseInfo;
function getDeviceInfo() {
    if (deviceInfo == null) {
        deviceInfo =
            typeof wx.getDeviceInfo === 'function'
                ? wx.getDeviceInfo()
                : getSystemInfoSync();
    }
    return deviceInfo;
}
exports.getDeviceInfo = getDeviceInfo;
function getWindowInfo() {
    return typeof wx.getWindowInfo === 'function'
        ? wx.getWindowInfo()
        : wx.getSystemInfoSync();
}
exports.getWindowInfo = getWindowInfo;
