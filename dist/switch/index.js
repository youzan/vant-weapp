import { VantComponent } from '../common/component';
VantComponent({
  field: true,
  classes: ['node-class'],
  props: {
    checked: Boolean,
    loading: Boolean,
    disabled: Boolean,
    size: {
      type: String,
      value: '30px'
    }
  },
  watch: {
    checked: function checked(value) {
      this.setData({
        value: value
      });
    }
  },
  created: function created() {
    this.setData({
      value: this.data.checked
    });
  },
  methods: {
    onClick: function onClick() {
      if (!this.data.disabled && !this.data.loading) {
        var checked = !this.data.checked;
        this.$emit('input', checked);
        this.$emit('change', checked);
      }
    }
  }
});