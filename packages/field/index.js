Component({
  behaviors: ['wx://form-field'],

  externalClasses: [
    'custom-class',
    'input-class'
  ],

  options: {
    multipleSlots: true
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
    errorMessage: String,
    placeholder: String,
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
      value: 'text',
      observer(currentValue) {
        this.setData({ currentValue });
      }
    },
    border: {
      type: Boolean,
      value: true
    }
  },

  data: {
    focused: false,
    showClear: false,
    currentValue: ''
  },

  attached() {
    this.setData({
      currentValue: this.data.value
    });
  },

  methods: {
    onInput(event) {
      const { value = '' } = event.detail || {};
      this.triggerEvent('input', value);
      this.triggerEvent('change', value);
      this.setData({
        currentValue: value,
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

    onTapIcon() {
      this.triggerEvent('tap-icon');
    },

    getShowClear(options) {
      const {
        focused = this.data.focused,
        value = this.data.currentValue
      } = options;

      return this.data.clearable && focused && value !== '' && !this.data.readonly;
    },

    onClear() {
      this.setData({
        currentValue: '',
        showClear: this.getShowClear({ value: '' })
      });
    }
  }
});
