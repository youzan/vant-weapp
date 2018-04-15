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

  syncChange({ detail }) {
    this.setData({
      'sync.checked': detail.checked
    });
  },

  asyncChange({ detail }) {
    this.setData({
      'async.loading': true
    });
    setTimeout(() => {
      this.setData({
        'async.loading': false,
        'async.checked': detail.checked
      });
    }, 500);
  }
}));
