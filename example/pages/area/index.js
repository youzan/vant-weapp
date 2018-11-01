import Page from '../../common/page';

Page({
  data: {
    areaList: {},
    loading: true,
    value: 330302
  },

  onShow() {
    wx.request({
      url: 'https://cashier.youzan.com/wsctrade/uic/address/getAllRegion.json',
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
