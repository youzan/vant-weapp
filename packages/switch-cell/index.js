import { VantComponent } from '../common/component';

VantComponent({
  field: true,

  props: {
    title: String,
    border: Boolean,
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
      value: '26px'
    }
  },

  created() {
    this.setData({ value: this.data.checked });
  },

  methods: {
    onChange(event) {
      this.$emit('change', event.detail);
    }
  }
});
