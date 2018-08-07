'use strict';

// Note that the bitwise operators and shift operators operate on 32-bit ints
// so in that case, the max safe integer is 2^31-1, or 2147483647
var MAX = 2147483647;

Component({
  externalClasses: ['custom-class', 'input-class', 'plus-class', 'minus-class'],

  properties: {
    value: {
      type: null,
      observer: function observer(val) {
        if (val !== this.currentValue) {
          this.setData({ currentValue: this.range(val) });
        }
      }
    },
    integer: Boolean,
    disabled: Boolean,
    disableInput: Boolean,
    min: {
      type: null,
      value: 1
    },
    max: {
      type: null,
      value: MAX
    },
    step: {
      type: null,
      value: 1
    }
  },

  attached: function attached() {
    this.setData({
      currentValue: this.range(this.data.value)
    });
  },


  methods: {
    // limit value range
    range: function range(value) {
      return Math.max(Math.min(this.data.max, value), this.data.min);
    },
    onInput: function onInput(event) {
      var _ref = event.detail || {},
          _ref$value = _ref.value,
          value = _ref$value === undefined ? '' : _ref$value;

      this.triggerInput(value);
    },
    onChange: function onChange(type) {
      if (this[type + 'Disabled']) {
        this.triggerEvent('overlimit', type);
        return;
      }

      var diff = type === 'minus' ? -this.data.step : +this.data.step;
      var value = Math.round((this.data.currentValue + diff) * 100) / 100;
      this.triggerInput(this.range(value));
      this.triggerEvent(type);
    },
    onBlur: function onBlur(event) {
      var currentValue = this.range(this.data.currentValue);
      this.triggerInput(currentValue);
      this.triggerEvent('blur', event);
    },
    onMinus: function onMinus() {
      this.onChange('minus');
    },
    onPlus: function onPlus() {
      this.onChange('plus');
    },
    triggerInput: function triggerInput(currentValue) {
      this.setData({ currentValue: currentValue });
      this.triggerEvent('input', currentValue);
      this.triggerEvent('change', currentValue);
    }
  }
});