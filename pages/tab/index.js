var ZUI = require('../../zui/index');

Page(Object.assign({}, ZUI.Tab, {
  data: {
    tab1: {
      list: [{
        id: 'all',
        title: '全部'
      }, {
        id: 'topay',
        title: '待付款'
      }, {
        id: 'tosend',
        title: '待发货'
      }, {
        id: 'send',
        title: '待收货'
      }, {
        id: 'sign',
        title: '已完成'
      }],
      selectedId: 'all',
      scroll: false
    },
    tab2: {
      list: [{
        id: '1',
        title: '最新商品1'
      }, {
        id: '2',
        title: '最新商品2'
      }, {
        id: '3',
        title: '最新商品3'
      }, {
        id: '4',
        title: '最新商品4'
      }, {
        id: '5',
        title: '最新商品5'
      }, {
        id: '6',
        title: '最新商品6'
      }],
      selectedId: '1',
      scroll: true
    }
  },

  handleZuiTabChange(e) {
    console.info('[ZUI:Tab:Change]', e);
    var id = e.id;
    var selectedId = e.selectedId;

    this.setData({
      [`${id}.selectedId`]: selectedId
    });
  }
}));
