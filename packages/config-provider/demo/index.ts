import { VantComponent } from '../../common/component';

VantComponent({
  data: {
    rate: 4,
    slider: 50,
    themeVars: {
      rateIconFullColor: '#07c160',
      sliderBarHeight: '4px',
      sliderButtonWidth: '20px',
      sliderButtonHeight: '20px',
      sliderActiveBackgroundColor: '#07c160',
      buttonPrimaryBorderColor: '#07c160',
      buttonPrimaryBackgroundColor: '#07c160',
    },
  },

  methods: {
    onChange(event) {
      const { key } = event.currentTarget.dataset;
      this.setData({
        [key]: event.detail,
      });
    },
  },
});
