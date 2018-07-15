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

  toggleOpenDialog() {
    Dialog({
      title: '弹窗',
      message: '获取用户数据',
      selector: '#zan-open-dialog',
      buttons: [{
        text: '用户信息',
        type: 'userInfo',
        openType: 'getUserInfo'
      }, {
        text: '获取手机号',
        type: 'tel',
        openType: 'getPhoneNumber'
      }, {
        text: '打开授权页',
        type: 'setting',
        openType: 'openSetting'
      }]
    }).then(({ type, openDataPromise}) => {
      console.log(type);
      openDataPromise.then((data) => {
        console.log('成功获取信息', data);
      }).catch((data) => {
        console.log('获取信息失败', data);
      });
    });
  },

  onShareAppMessage() {
    return {
      title: 'ZanUI-WeApp',
      imageUrl: 'https://img.yzcdn.cn/public_files/2017/02/06/ee0ebced79a80457d77ce71c7d414c74.png'
    };
  },
});
