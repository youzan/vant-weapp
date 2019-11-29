import Page from '../../common/page';
import Toast from '../../dist/toast/toast';

const db = wx.cloud.database();

Page({
  data: {
    areaList: {},
    loading: true,
    value: 330302
  },

  onShow() {
    db.collection('region').limit(1).get().then(res => {
      if (res.data && res.data.length > 0) {
        this.setData({
          loading: false,
          areaList: res.data[0]
        });
      }
    })
      .catch(err => {
        console.log(err);
        this.setData({
          loading: false,
        });
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
