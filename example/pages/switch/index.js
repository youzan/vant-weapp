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

  syncChange(e, data) {
    this.setData({
      sync: {
        checked: data.checked
      }
    });
  },

  asyncChange(e, data) {
    this.setData({
      async: {
        loading: true
      }
    });
    setTimeout(() => {
      this.setData({
        async: {
          loading: false,
          checked: data.checked
        }
      });
    }, 500);
  }
}));
