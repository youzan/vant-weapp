import Page from '../../common/page';
import Toast from '../../dist/toast/toast';

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
    const { values } = event.detail;

    Toast(values.map(item => item.name).join('-'));
  },

  onConfirm(event) {
    console.log(event);
  },

  onCancel(event) {
    console.log(event);
  }
});
