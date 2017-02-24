var Zan = require('../../dist/index');

Page(Object.assign({}, Zan.Switch, {
  data: {
    sync: {
      checked: false
    },
    async: {
      checked: true,
      loading: false
    },
  },

  handleZanSwitchChange(e) {
    var componentId = e.componentId;
    var checked = e.checked;

    if (componentId == 'sync') {
      // 同步开关
      this.setData({
        [`${componentId}.checked`]: checked
      });
    } else if (componentId == 'async') {
      // 异步开关
      this.setData({
        [`${componentId}.loading`]: true
      });
      setTimeout(() => {
        this.setData({
          [`${componentId}.loading`]: false,
          [`${componentId}.checked`]: checked
        });
      }, 500);
    }
  }
}));
