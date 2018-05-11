Page({
  customChange ({detail}) {
    this.setData({pickerView1: detail.value.join('-')})
  },
  nativeChange ({detail}) {
    this.setData({pickerView2: detail.value.join('-')})
  }
})