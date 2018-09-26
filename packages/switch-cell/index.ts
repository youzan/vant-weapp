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
    checked(value) {
      this.setData({ value });
    }
  },

  created() {
    this.setData({ value: this.data.checked });
  },

  methods: {
    onChange(event: Weapp.Event) {
      this.$emit('change', event.detail);
    }
  }
});
