Page({
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

  _handleComponentTabChange(e) {
    var dataset = e.currentTarget.dataset;
    var componentId = dataset.componentId;
    var selectedId = dataset.itemId;

    if (this.handleComponentTabChange) {
      this.handleComponentTabChange({
        componentId,
        selectedId
      });
    }
  },

  handleComponentTabChange(e) {
    console.log('[handleComponentTabChange]', e);
    var componentId = e.componentId;
    var selectedId = e.selectedId;

    this.setData({
      [`${componentId}.selectedId`]: selectedId
    });
  }
});
