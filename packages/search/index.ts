import { VantComponent } from '../common/component';

VantComponent({
  field: true,

  classes: ['cancel-class'],

  props: {
    focus: Boolean,
    error: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    inputAlign: String,
    showAction: Boolean,
    useActionSlot: Boolean,
    placeholder: String,
    placeholderStyle: String,
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
    onChange(event: Weapp.Event) {
      this.setData({ value: event.detail });
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
