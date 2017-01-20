module.exports = {
  showZuiToast(title, timeout) {
    var zuiToast = this.data.zuiToast || {};
    clearTimeout(zuiToast.timer);

    // 弹层设置~
    zuiToast = {
      show: true,
      title
    };
    this.setData({
      zuiToast
    });

    var timer = setTimeout(() => {
      this.clearZuiToast();
    }, timeout || 3000);

    this.setData({
      'zuiToast.timer': timer
    });
  },

  clearZuiToast() {
    var zuiToast = this.data.zuiToast || {};
    clearTimeout(zuiToast.timer);

    this.setData({
      'zuiToast.show': false
    });
  }
};
