import Page from '../../common/page';
import Toast from '../../dist/toast/toast';

Page({
  data: {
    show: {
      basic: false,
      withDesc: false,
      multiLine: false,
      customIcon: false,
    },
    options: [
      { name: '微信', icon: 'wechat', openType: 'share' },
      { name: '朋友圈', icon: 'wechat-moments' },
      { name: 'QQ', icon: 'qq' },
      { name: '微博', icon: 'weibo' },
      { name: '复制链接', icon: 'link' },
      { name: '分享海报', icon: 'poster' },
      { name: '二维码', icon: 'qrcode' },
      { name: '小程序码', icon: 'weapp-qrcode' },
    ],

    multiLineOptions: [
      [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: 'QQ', icon: 'qq' },
      ],
      [
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
    ],

    customIconOptions: [
      {
        name: '名称',
        icon: 'https://img.yzcdn.cn/vant/custom-icon-fire.png',
      },
      {
        name: '名称',
        icon: 'https://img.yzcdn.cn/vant/custom-icon-light.png',
      },
      {
        name: '名称',
        icon: 'https://img.yzcdn.cn/vant/custom-icon-water.png',
      },
    ],

    optionsWithDesc: [
      { name: '微信', icon: 'wechat' },
      { name: '微博', icon: 'weibo' },
      {
        name: '复制链接',
        icon: 'link',
        description: '描述信息',
      },
      { name: '分享海报', icon: 'poster' },
      { name: '二维码', icon: 'qrcode' },
    ],
  },

  onShowShareSheet(event) {
    this.setData({
      [`show.${event.target.dataset.type}`]: true,
    });
  },

  onClose() {
    this.setData({
      show: {
        basic: false,
        withDesc: false,
        multiLine: false,
        customIcon: false,
      },
    });
  },

  onSelect(event) {
    Toast(event.detail.name);
    this.onClose();
  },
});
