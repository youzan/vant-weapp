interface XCX {
  showToast(): void;
}

declare const wx: XCX;
declare const my: XCX;
declare const swan: XCX;
declare const tt: XCX;

// 微信小程序
const isWx = typeof wx !== 'undefined' && typeof wx.showToast === 'function';

// 支付宝小程序
const isMy = typeof my !== 'undefined' && typeof my.showToast === 'function';

// 百度智能小程序
const isSwan = typeof swan !== 'undefined' && typeof swan.showToast === 'function';

// 字节跳动小程序
const isTt = typeof tt !== 'undefined' && typeof tt.showToast === 'function';

const isAlipay = isMy;
const isBaidu = isSwan;
// 排它性处理，防止使用微信小程序代码转换成其他平台代码时存在问题
const isWechat = isWx && !isMy && !isSwan && !isTt;

export {
  isAlipay,
  isBaidu,
  isTt,
  isWechat,
};
