import { VantComponent } from '../common/component';

VantComponent({
  field: true,

  classes: ['node-class'],

  props: {
    loading: Boolean,
    disabled: Boolean,
    checked: {
      type: Boolean,
      observer(value) {
        this.setData({ value });
      }
    },
    size: {
      type: String,
      value: '30px'
    }
  },

  created() {
    this.setData({ value: this.data.checked });
  },

  methods: {
    onClick() {
      if (!this.data.disabled && !this.data.loading) {
        const checked = !this.data.checked;
        this.$emit('input', checked);
        this.$emit('change', checked);
      }
    }
  }
});
