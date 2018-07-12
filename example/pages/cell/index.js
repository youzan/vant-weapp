var Zan = require('../../dist/index');

Page(Object.assign({}, Zan.Switch, {
  data: {
    checked: false,
    show: true,
    date: ''
  },

  onLoad() {
  },

  onShow() {
  },

  handleZanSwitchChange(e) {
    this.setData({
      checked: e.checked
    });
  },

  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    });
  },

  handleTap() {
    console.log('cell tapped');
  }
}));
