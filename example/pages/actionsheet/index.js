const { Actionsheet, extend } = require('../../dist/index');

Page(extend({}, Actionsheet, {
  data: {
    baseActionsheet: {
      show: false,
      cancelText: '关闭 Action',
      closeOnClickOverlay: true,
      componentId: 'baseActionsheet',
      actions: [{
        name: '选项1',
        subname: '选项描述语1',
        className: 'action-class',
        loading: false
      }, {
        name: '选项2',
        subname: '选项描述语2',
        className: 'action-class',
        loading: false
      }]
    }
  },

  toggleActionsheet() {
    this.setData({
      'baseActionsheet.show': true
    });
  },

  handleZanActionsheetCancel({ componentId }) {
    this.setData({
      [`${componentId}.show`]: false
    });
  },

  handleZanActionsheetClick({ componentId, index }) {
    console.log(`item index ${index} clicked`);

    this.setData({
      [`${componentId}.actions[${index}].loading`]: true
    });

    setTimeout(() => {
      this.setData({
        [`${componentId}.show`]: false,
        [`${componentId}.actions[${index}].loading`]: false
      });
    }, 1500);
  }

}));
