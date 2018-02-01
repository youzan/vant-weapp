module.exports = {
  showZanTopTips(content = '', options = {}) {
    let zanTopTips = this.data.zanTopTips || {};
    // 如果已经有一个计时器在了，就清理掉先
    if (zanTopTips.timer) {
      clearTimeout(zanTopTips.timer);
      zanTopTips.timer = 0;
    }

    if (typeof options === 'number') {
      options = {
        duration: options
      };
    }

    // options参数默认参数扩展
    options = Object.assign({
      duration: 3000
    }, options);

    // 设置定时器，定时关闭topTips
    let timer = setTimeout(() => {
      this.setData({
        'zanTopTips.show': false,
        'zanTopTips.timer': 0
      });
    }, options.duration);

    // 展示出topTips
    this.setData({
      zanTopTips: {
        show: true,
        content,
        options,
        timer
      }
    });
  }
};
