import { VantComponent } from '../common/component';

VantComponent({
  field: true,

  classes: ['input-class'],

  props: {
    icon: String,
    label: String,
    error: Boolean,
    fixed: Boolean,
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
    inputAlign: String,
    customClass: String,
    confirmType: String,
    confirmHold: Boolean,
    errorMessage: String,
    placeholder: String,
    customStyle: String,
    useIconSlot: Boolean,
    useButtonSlot: Boolean,
    showConfirmBar: {
      type: Boolean,
      value: true
    },
    placeholderStyle: String,
    adjustPosition: {
      type: Boolean,
      value: true
    },
    cursorSpacing: {
      type: Number,
      value: 50
    },
    maxlength: {
      type: Number,
      value: -1
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
    showClear: false
  },

  beforeCreate() {
    this.focused = false;
  },

  methods: {
    onInput(event: Weapp.Event) {
      const { value = '' } = event.detail || {};

      this.set({
        value,
        showClear: this.getShowClear(value)
      }, () => {
        this.$emit('input', value);
        this.$emit('change', value);
      });
    },

    onFocus(event: Weapp.Event) {
      const { value = '', height = 0 } = event.detail || {};
      this.$emit('focus', { value, height });
      this.focused = true;
      this.set({
        showClear: this.getShowClear()
      });
    },

    onBlur(event: Weapp.Event) {
      const { value = '', cursor = 0 } = event.detail || {};
      this.$emit('blur', { value, cursor });
      this.focused = false;
      this.set({
        showClear: this.getShowClear()
      });
    },

    onClickIcon() {
      this.$emit('click-icon');
    },

    getShowClear(value?: string): boolean {
      value = value === undefined ? this.data.value : value;
      return (
        this.data.clearable && this.focused && value && !this.data.readonly
      );
    },

    onClear() {
      this.set({
        value: '',
        showClear: this.getShowClear('')
      }, () => {
        this.$emit('input', '');
        this.$emit('change', '');
        this.$emit('clear', '');
      });
    },

    onConfirm() {
      this.$emit('confirm', this.data.value);
    }
  }
});
