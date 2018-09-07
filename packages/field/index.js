import { create } from '../common/create';

create({
  field: true,

  classes: ['input-class'],

  props: {
    icon: String,
    label: String,
    error: Boolean,
    focus: Boolean,
    center: Boolean,
    isLink: Boolean,
    leftIcon: String,
    disabled: Boolean,
    autosize: Boolean,
    readonly: Boolean,
    required: Boolean,
    iconClass: String,
    clearable: Boolean,
    labelAlign: String,
    inputAlign: String,
    customClass: String,
    confirmType: String,
    errorMessage: String,
    placeholder: String,
    customStyle: String,
    useIconSlot: Boolean,
    useButtonSlot: Boolean,
    placeholderClass: String,
    cursorSpacing: {
      type: Number,
      value: 50
    },
    maxlength: {
      type: Number,
      value: -1
    },
    value: {
      type: null,
      value: ''
    },
    type: {
      type: String,
      value: 'text'
    },
    border: {
      type: Boolean,
      value: true
    },
    titleWidth: {
      type: String,
      value: '90px'
    }
  },

  data: {
    focused: false,
    showClear: false
  },

  methods: {
    onInput(event) {
      const { value = '' } = event.detail || {};
      this.$emit('input', value);
      this.$emit('change', value);
      this.setData({
        value,
        showClear: this.getShowClear({ value })
      });
    },

    onFocus(event) {
      this.$emit('focus', event);
      this.setData({
        focused: true,
        showClear: this.getShowClear({ focused: true })
      });
    },

    onBlur(event) {
      this.focused = false;
      this.$emit('blur', event);
      this.setData({
        focused: false,
        showClear: this.getShowClear({ focused: false })
      });
    },

    onClickIcon() {
      this.$emit('click-icon');
    },

    getShowClear(options) {
      const { focused = this.data.focused, value = this.data.value } = options;

      return (
        this.data.clearable && focused && value !== '' && !this.data.readonly
      );
    },

    onClear() {
      this.setData({
        value: '',
        showClear: this.getShowClear({ value: '' })
      });
      this.$emit('input', '');
      this.$emit('change', '');
    },

    onConfirm() {
      this.$emit('confirm', this.data.value);
    }
  }
});
