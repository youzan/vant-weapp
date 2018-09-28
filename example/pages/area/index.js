import Page from '../../common/page';

Page({
  data: {
    areaList: {},
    loading: true,
    value: 330302
  },

  onShow() {
    wx.request({
      url: 'https://cashier.youzan.com/pay/wsctrade/order/buy/getAllRegion.json',
      success: response => {
        this.setData({
          loading: false,
          areaList: response.data.data
        });
      }
    });
  },

  onChange(event) {
    console.log(event);
  }
});
