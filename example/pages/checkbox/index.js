Page({
  data: {
    items: [
      { value: 'a' },
      { value: 'b', checked: true },
      { value: 'c' }
    ]
  },

  handleCheckboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail);
    console.log('items:', this.data.items);
  }
});
