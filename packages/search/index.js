import { VantComponent } from '../common/component';

VantComponent({
  field: true,

  classes: ['cancel-class'],

  props: {
    focus: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    showAction: Boolean,
    useActionSlot: Boolean,
    placeholder: String,
    background: {
      type: String,
      value: '#f2f2f2'
    },
    maxlength: {
      type: Number,
      value: -1
    }
  },

  methods: {
    onChange(event) {
      this.$emit('change', event.detail);
    },

    onCancel() {
      this.setData({ value: '' });
      this.$emit('cancel');
      this.$emit('change', '');
    },

    onSearch() {
      this.$emit('search', this.data.value);
    },

    onFocus() {
      this.$emit('focus');
    },

    onBlur() {
      this.$emit('blur');
    }
  }
});
