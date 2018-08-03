Page({
  data: {
    items: [
      { value: 'USA', name: '美国' },
      { value: 'CHN', name: '中国', checked: 'true' }
    ],

    items1: [
      { value: 'USA', name: '美国' },
      { value: 'BRA', name: '巴西', disabled: true },
      { value: 'CHN', name: '中国', checked: 'true' }
    ]
  },

  handleRadioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail);
  }
});
