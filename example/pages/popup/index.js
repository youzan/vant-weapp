Page({
  data: {
    showLeftPopup: false,
    showRightPopup: false
  },
  toggleLeftPopup() {
    this.setData({
      showLeftPopup: !this.data.showLeftPopup
    });
  },
  toggleRightPopup() {
    this.setData({
      showRightPopup: !this.data.showRightPopup
    });
  }
})
