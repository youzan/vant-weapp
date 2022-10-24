import { getSystemInfoSync } from './utils';

function compareVersion(v1, v2) {
  v1 = v1.split('.');
  v2 = v2.split('.');
  const len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push('0');
  }
  while (v2.length < len) {
    v2.push('0');
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i], 10);
    const num2 = parseInt(v2[i], 10);

    if (num1 > num2) {
      return 1;
    }
    if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}

function gte(version: string) {
  const system = getSystemInfoSync();

  return compareVersion(system.SDKVersion, version) >= 0;
}

export function canIUseModel() {
  return gte('2.9.3');
}

export function canIUseFormFieldButton() {
  return gte('2.10.3');
}

export function canIUseAnimate() {
  return gte('2.9.0');
}

export function canIUseGroupSetData() {
  return gte('2.4.0');
}

/**
 *
 * wx.nextTick
 * 基础库 2.2.3 开始支持，低版本需做兼容处理。
 * 小程序插件：支持，需要小程序基础库版本不低于 2.7.1
 * 微信 Windows 版：支持
 * 微信 Mac 版：支持
 *
 * 插件内不支持调用 wx.canIUse
 */
export function canIUseNextTick() {
  try {
    return wx.canIUse('nextTick');
    // 小程序插件不支持 wx.canIUse
  } catch (e) {
    // 小程序基础库版本不低于2.7.1插件可以调用wx.nextTick
    return gte('2.7.1');
  }
}

export function canIUseCanvas2d() {
  return gte('2.9.0');
}

export function canIUseGetUserProfile() {
  return !!wx.getUserProfile;
}
