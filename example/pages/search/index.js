Page({
  data: {
    inputValue: '',
    focus: true
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
  }
});
