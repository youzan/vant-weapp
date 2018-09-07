import { create } from '../common/create';

create({
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

  attached() {
    this.setData({ value: this.data.checked });
  },

  methods: {
    onChange(event) {
      this.$emit('change', event.detail);
    }
  }
});
