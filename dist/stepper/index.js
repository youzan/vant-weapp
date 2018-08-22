// Note that the bitwise operators and shift operators operate on 32-bit ints
// so in that case, the max safe integer is 2^31-1, or 2147483647
const MAX = 2147483647;

Component({
  options: {
    addGlobalClass: true
  },

  externalClasses: [
    'custom-class',
    'input-class',
    'plus-class',
    'minus-class'
  ],

  properties: {
    value: {
      type: null,
      observer(val) {
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

  attached() {
    this.setData({
      currentValue: this.range(this.data.value)
    });
  },

  methods: {
    // limit value range
    range(value) {
      return Math.max(Math.min(this.data.max, value), this.data.min);
    },

    onInput(event) {
      const { value = '' } = event.detail || {};
      this.triggerInput(value);
    },

    onChange(type) {
      if (this[`${type}Disabled`]) {
        this.triggerEvent('overlimit', type);
        return;
      }

      const diff = type === 'minus' ? -this.data.step : +this.data.step;
      const value = Math.round((this.data.currentValue + diff) * 100) / 100;
      this.triggerInput(this.range(value));
      this.triggerEvent(type);
    },

    onBlur(event) {
      const currentValue = this.range(this.data.currentValue);
      this.triggerInput(currentValue);
      this.triggerEvent('blur', event);
    },

    onMinus() {
      this.onChange('minus');
    },

    onPlus() {
      this.onChange('plus');
    },

    triggerInput(currentValue) {
      this.setData({ currentValue });
      this.triggerEvent('input', currentValue);
      this.triggerEvent('change', currentValue);
    }
  }
});
