Component({
  behaviors: ['wx://form-field'],

  externalClasses: [
    'input-class'
  ],

  options: {
    multipleSlots: true,
    addGlobalClass: true
  },

  properties: {
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
    }
  },

  data: {
    focused: false,
    showClear: false
  },

  methods: {
    onInput(event) {
      const { value = '' } = event.detail || {};
      this.triggerEvent('input', value);
      this.triggerEvent('change', value);
      this.setData({
        value,
        showClear: this.getShowClear({ value })
      });
    },

    onFocus(event) {
      this.triggerEvent('focus', event);
      this.setData({
        focused: true,
        showClear: this.getShowClear({ focused: true })
      });
    },

    onBlur(event) {
      this.focused = false;
      this.triggerEvent('blur', event);
      this.setData({
        focused: false,
        showClear: this.getShowClear({ focused: false })
      });
    },

    onClickIcon() {
      this.triggerEvent('click-icon');
    },

    getShowClear(options) {
      const {
        focused = this.data.focused,
        value = this.data.value
      } = options;

      return this.data.clearable && focused && value !== '' && !this.data.readonly;
    },

    onClear() {
      this.setData({
        value: '',
        showClear: this.getShowClear({ value: '' })
      });
      this.triggerEvent('input', '');
      this.triggerEvent('change', '');
    },

    onConfirm() {
      this.triggerEvent('confirm', this.data.value);
    }
  }
});
