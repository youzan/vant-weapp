import { VantComponent } from '../../common/component';

const format = (rate) => Math.min(Math.max(rate, 0), 100);

VantComponent({
  data: {
    value: 25,
    gradientColor: {
      '0%': '#ffd01e',
      '100%': '#ee0a24',
    },
  },

  methods: {
    run(e) {
      const step = parseFloat(e.currentTarget.dataset.step);
      this.setData({
        value: format((this.data.value += step)),
      });
    },
  },
});
