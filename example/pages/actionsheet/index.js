const Zan = require('../../dist/index');

Page(Object.assign({}, Zan.Actionsheet, {
  data: {
    baseActionsheet: {
      show: false,
      cancelText: '关闭 Action',
      closeOnClickOverlay: false,
      actions: [{
        name: '选项',
        subname: '选项描述语',
        className: 'action-class',
        loading: false,
        type: 'action1'
      }]
    }
  },

  toggleActionsheet() {
    this.setData({
      'baseActionsheet.show': true
    });
  }

}));
