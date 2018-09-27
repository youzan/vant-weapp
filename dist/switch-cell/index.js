import { VantComponent } from '../common/component';
VantComponent({
  field: true,
  props: {
    title: String,
    border: Boolean,
    checked: Boolean,
    loading: Boolean,
    disabled: Boolean,
    size: {
      type: String,
      value: '26px'
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
    onChange: function onChange(event) {
      this.$emit('change', event.detail);
    }
  }
});