const touchBehaviors = require('../behaviors/touch');

Component({
  options: {
    addGlobalClass: true
  },

  externalClasses: ['custom-class'],

  behaviors: [touchBehaviors],

  properties: {
    disabled: Boolean,
    max: {
      type: Number,
      value: 100
    },
    min: {
      type: Number,
      value: 0
    },
    step: {
      type: Number,
      value: 1
    },
    value: {
      type: Number,
      value: 0
    },
    barHeight: {
      type: String,
      value: '2px'
    }
  },

  attached() {
    this.updateValue(this.data.value);
  },

  methods: {
    getRect(callback) {
      wx.createSelectorQuery()
        .in(this)
        .select('.van-slider')
        .boundingClientRect(callback)
        .exec();
    },

    onTouchStart(event) {
      if (this.data.disabled) return;

      this.touchStart(event);
      this.startValue = this.format(this.data.value);
    },

    onTouchMove(event) {
      if (this.data.disabled) return;

      this.touchMove(event);
      this.getRect(rect => {
        const diff = this.deltaX / rect.width * 100;
        this.updateValue(this.startValue + diff);
      });
    },

    onTouchEnd() {
      if (this.data.disabled) return;
      this.updateValue(this.data.value, true);
    },

    onClick(event) {
      if (this.data.disabled) return;

      this.getRect(rect => {
        const value = (event.detail.x - rect.left) / rect.width * 100;
        this.updateValue(value, true);
      });
    },

    updateValue(value, end) {
      value = this.format(value);

      this.setData({
        value,
        barStyle: `width: ${value}%; height: ${this.data.barHeight};`
      });

      if (end) {
        this.triggerEvent('change', value);
      }
    },

    format(value) {
      const { max, min, step } = this.data;
      return Math.round(Math.max(min, Math.min(value, max)) / step) * step;
    }
  }
});
