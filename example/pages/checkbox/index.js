var Zan = require('../../dist/index');

Page({

  data: {
    items: [
      {name: 'USA', value: '美国'},
      {name: 'CHN', value: '中国', checked: 'true'},
      {name: 'BRA', value: '巴西'},
      {name: 'JPN', value: '日本'},
      {name: 'ENG', value: '英国'},
      {name: 'TUR', value: '法国'},
    ]
  },

  handleCheckboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  }
});
