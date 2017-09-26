var Zan = require('../../dist/index');

Page(Object.assign({}, Zan.Quickpick, {
  data: {
    quickpick1: [{
      text: '不要辣',
      selected: false
    }, {
      text: '微辣',
      selected: false
    }, {
      text: '中辣',
      selected: false
    }, {
      text: '重辣',
      selected: false
    }, {
      text: '少盐',
      selected: false
    }, {
      text: '少油',
      selected: false
    }, {
      text: '不要蒜',
      selected: false
    }, {
      text: '不要葱',
      selected: false
    }, {
      text: '少放醋',
      selected: false
    }, {
      text: '多放醋',
      selected: false
    }],
    quickpick2: ['不要辣', '微辣', '中辣', '重辣', '少盐', '少油', '不要蒜', '不要葱', '少放醋', '多放醋']
  },
  handleZanQuickpick(componentId, data) {

  }
}));
