module.exports = {
  showZuiToast(title, timeout) {
    var componentToast = this.data.componentToast || {};
    clearTimeout(componentToast.timer);

    // 弹层设置~
    componentToast = {
      show: true,
      title
    };
    this.setData({
      componentToast
    });

    componentToast.timer = setTimeout(() => {
      this.clearZuiToast();
    }, timeout || 3000);
  },

  clearZuiToast() {
    var componentToast = this.data.componentToast || {};
    clearTimeout(componentToast.timer);

    this.setData({
      'componentToast.show': false
    });
  }
};
