import Page from '../../common/page';

const format = rate => Math.min(Math.max(rate, 0), 100);

Page({
  data: {
    value: 25,
    gradientColor: {
      '0%': '#ffd01e',
      '100%': '#ee0a24'
    }
  },

  run(e) {
    const step = parseFloat(e.currentTarget.dataset.step);
    this.setData({
      value: format((this.data.value += step))
    });
  }
});
