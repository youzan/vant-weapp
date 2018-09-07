import { create } from '../common/create';

// Note that the bitwise operators and shift operators operate on 32-bit ints
// so in that case, the max safe integer is 2^31-1, or 2147483647
const MAX = 2147483647;

create({
  field: true,

  classes: [
    'input-class',
    'plus-class',
    'minus-class'
  ],

  props: {
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
      value: this.range(this.data.value)
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
        this.$emit('overlimit', type);
        return;
      }

      const diff = type === 'minus' ? -this.data.step : +this.data.step;
      const value = Math.round((this.data.value + diff) * 100) / 100;
      this.triggerInput(this.range(value));
      this.$emit(type);
    },

    onBlur(event) {
      const value = this.range(this.data.value);
      this.triggerInput(value);
      this.$emit('blur', event);
    },

    onMinus() {
      this.onChange('minus');
    },

    onPlus() {
      this.onChange('plus');
    },

    triggerInput(value) {
      this.setData({ value });
      this.$emit('change', value);
    }
  }
});
