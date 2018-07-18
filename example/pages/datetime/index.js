Page({
  onLoad () {
    setTimeout(() => {
      this.setData({
        date: new Date('2300/12/12').getTime()
      })
    }, 100)
  },

  customChange ({detail}) {
    this.setData({pickerView1: detail.value.join('-')})
  },

  nativeChange ({detail}) {
    this.setData({pickerView2: detail.value.join('-')})
  },

  change ({ detail: { value, date } }) {
    console.log('value is', value, 'and date is', date)
  }
})