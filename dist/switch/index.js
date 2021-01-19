import { VantComponent } from '../common/component';
VantComponent({
  field: true,
  classes: ['node-class'],
  props: {
    checked: null,
    loading: Boolean,
    disabled: Boolean,
    activeColor: String,
    inactiveColor: String,
    size: {
      type: String,
      value: '30',
    },
    activeValue: {
      type: null,
      value: true,
    },
    inactiveValue: {
      type: null,
      value: false,
    },
  },
  methods: {
    onClick() {
      const { activeValue, inactiveValue, disabled, loading } = this.data;
      if (disabled || loading) {
        return;
      }
      const checked = this.data.checked === activeValue;
      const value = checked ? inactiveValue : activeValue;
      this.$emit('input', value);
      this.$emit('change', value);
    },
  },
});
