import Page from '../../common/page';
import Toast from '../../dist/toast/toast';

Page({
  data: {
    btnList: [
      {
        type: 'mini',
        icon: 'chat',
        text: '客服',
        bindClickEventName: 'onClickChatBtn'
      },
      {
        type: 'mini',
        icon: 'cart',
        text: '购物车'
      },
      {
        type: 'big',
        text: '加入购物车'
      },
      {
        type: 'big',
        text: '立即购买',
        primary: true,
        bindClickEventName: 'onClickBuyBtn'
      }
    ],
    btnListInfo: [
      {
        type: 'mini',
        icon: 'chat',
        text: '客服',
        url: '/pages/submit-bar/index',
        replace: true,
        info: 15
      },
      {
        type: 'mini',
        icon: 'cart',
        text: '购物车',
        info: '5'
      },
      {
        type: 'mini',
        icon: 'shop',
        text: '店铺'
      },
      {
        type: 'big',
        text: '加入购物车'
      },
      {
        type: 'big',
        text: '立即购买',
        primary: true,
        url: '/pages/submit-bar/index',
        replace: false
      }
    ]
  },

  onClick(event) {
    const { bindClickEventName } = event.detail;
    this[`${bindClickEventName}`]();
  },

  onClickChatBtn() {
    Toast('点击图标');
  },

  onClickBuyBtn() {
    Toast('点击按钮');
  }
});
