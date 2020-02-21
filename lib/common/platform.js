"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 微信小程序
var isWx = typeof wx !== 'undefined' && typeof wx.showToast === 'function';
// 支付宝小程序
var isMy = typeof my !== 'undefined' && typeof my.showToast === 'function';
// 百度智能小程序
var isSwan = typeof swan !== 'undefined' && typeof swan.showToast === 'function';
// 字节跳动小程序
var isTt = typeof tt !== 'undefined' && typeof tt.showToast === 'function';
exports.isTt = isTt;
var isAlipay = isMy;
exports.isAlipay = isAlipay;
var isBaidu = isSwan;
exports.isBaidu = isBaidu;
// 排它性处理，防止使用微信小程序代码转换成其他平台代码时存在问题
var isWechat = isWx && !isMy && !isSwan && !isTt;
exports.isWechat = isWechat;
