var Zan = require('../../dist/index');

Page(Object.assign({}, Zan.Switch, {
  data: {
    checked: false
  },

  onLoad() {
  },

  onShow() {
  },

  handleZanSwitchChange(e) {
    this.setData({
      checked: e.checked
    });
  }
}));
