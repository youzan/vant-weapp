import Page from '../../common/page';
import AreaList from './area';

Page({
  data: {
    areaList: {},
    loading: true,
    value: 330302
  },

  onShow() {
    setTimeout(() => {
      this.setData({
        loading: false,
        areaList: AreaList
      });
    }, 1500);
  },

  onChange(event) {
    console.log(event);
  }
});
