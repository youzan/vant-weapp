const Dialog = require('../../dist/dialog/dialog');

Page({
  toggleBaseDialog() {
    Dialog({
      title: '弹窗',
      message: '这是一个模态弹窗\n换行',
      selector: '#zan-base-dialog',
      showCancelButton: true
    }).then(() => {
      console.log('=== dialog resolve ===', 'type: confirm');
    }).catch(() => {
      console.log('=== dialog reject ===', 'type: cancel');
    });
  },

  toggleWithoutTitleDialog() {
    Dialog({
      message: '这是一个模态弹窗',
      selector: '#zan-no-title-dialog'
    }).then(() => {
      console.log('=== dialog ===', 'type: confirm');
    });
  },

  toggleButtonDialog() {
    Dialog({
      title: '弹窗',
      message: '这是一个模态弹窗',
      selector: '#zan-button-dialog',
      buttons: [{
        text: '现金支付',
        color: 'red',
        type: 'cash'
      }, {
        text: '分享',
        type: 'share',
        openType: 'share'
      }, {
        text: '微信支付',
        color: '#3CC51F',
        type: 'wechat'
      }, {
        text: '取消',
        type: 'cancel'
      }]
    }).then(({ type }) => {
      console.log('=== dialog with custom buttons ===', `type: ${type}`);
    });
  },

  toggleVerticalDialog() {
    Dialog({
      title: '弹窗',
      message: '这是一个模态弹窗',
      selector: '#zan-vertical-dialog',
      buttonsShowVertical: true,
      buttons: [{
        text: '现金支付',
        color: 'red',
        type: 'cash'
      }, {
        text: '微信支付',
        color: '#3CC51F',
        type: 'wechat'
      }, {
        text: '分享',
        type: 'share',
        openType: 'share'
      }, {
        text: '取消',
        type: 'cancel'
      }]
    }).then(({ type }) => {
      console.log('=== dialog with vertical buttons ===', `type: ${type}`);
    });
  },

  onShareAppMessage() {
    return {
      title: 'ZanUI-WeApp',
      imageUrl: 'https://img.yzcdn.cn/public_files/2017/02/06/ee0ebced79a80457d77ce71c7d414c74.png'
    };
  },
});
