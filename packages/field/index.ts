import { VantComponent } from '../common/component';

VantComponent({
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
    inputAlign: String,
    customClass: String,
    confirmType: String,
    errorMessage: String,
    placeholder: String,
    customStyle: String,
    useIconSlot: Boolean,
    useButtonSlot: Boolean,
    placeholderStyle: String,
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

  computed: {
    inputClass(): string {
      const { data } = this;
      return this.classNames('input-class', 'van-field__input', {
        'van-field--error': data.error,
        'van-field__textarea': data.type === 'textarea',
        'van-field__input--disabled': data.disabled,
        [`van-field--${data.inputAlign}`]: data.inputAlign
      });
    }
  },

  beforeCreate() {
    this.focused = false;
  },

  methods: {
    onInput(event: Weapp.Event) {
      const { value = '' } = event.detail || {};
      this.$emit('input', value);
      this.$emit('change', value);
      this.setData({
        value,
        showClear: this.getShowClear(value)
      });
    },

    onFocus() {
      this.$emit('focus');
      this.focused = true;
      this.setData({
        showClear: this.getShowClear()
      });
    },

    onBlur() {
      this.focused = false;
      this.$emit('blur');
      this.setData({
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
      this.setData({
        value: '',
        showClear: this.getShowClear('')
      });
      this.$emit('input', '');
      this.$emit('change', '');
    },

    onConfirm() {
      this.$emit('confirm', this.data.value);
    }
  }
});
