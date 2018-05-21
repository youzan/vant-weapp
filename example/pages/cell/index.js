var Zan = require('../../dist/index');

Page(Object.assign({}, Zan.Switch, {
  data: {
    checked: false,
    show: true
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

  handleTap() {
    console.log('cell tapped');
  }
}));
