var timer = undefined;

module.exports = {
  showZanTopTips(content = '', options = {}) {
    // 如果已经有一个计时器在了，就清理掉先
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
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

    // 展示出topTips
    this.setData({
      zanTopTips: {
        show: true,
        content,
        options
      }
    });

    // 设置定时器，定时关闭topTips
    timer = setTimeout(() => {
      this.setData({
        'zanTopTips.show': false
      });
      timer = undefined;
    }, options.duration);
  }
};
