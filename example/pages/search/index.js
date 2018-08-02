Page({
  data: {
    inputValue: '',
    focus: true,
    range: ['门店', '配送至'],
    rangeIndex: 0
  },

  searchChange(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  searchDone(e) {
    console.error('search', e.detail.value)
  },

  handleCancel() {
    console.error('cancel')
  },

  pickerChange(e) {
    this.setData({
      rangeIndex: e.detail.value
    })
  }
});
