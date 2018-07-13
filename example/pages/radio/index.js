Page({

  data: {
    items: [
      {name: 'USA', value: '美国'},
      {name: 'CHN', value: '中国', checked: 'true'}
    ],

    items1: [
      {name: 'USA', value: '美国'},
      {name: 'BRA', value: '巴西', disabled: true },
      {name: 'CHN', value: '中国', checked: 'true'}
    ]
  },

  handleRadioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail)
  }
});
