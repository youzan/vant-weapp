'use strict';

Component({
  behaviors: ['wx://form-field'],

  externalClasses: ['input-class'],

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
    customClass: String,
    confirmType: String,
    errorMessage: String,
    placeholder: String,
    customStyle: String,
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
      value: '',
      observer: function observer(currentValue) {
        this.setData({ currentValue: currentValue });
      }
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
    showClear: false,
    currentValue: ''
  },

  attached: function attached() {
    this.setData({
      currentValue: this.data.value
    });
  },


  methods: {
    onInput: function onInput(event) {
      var _ref = event.detail || {},
          _ref$value = _ref.value,
          value = _ref$value === undefined ? '' : _ref$value;

      this.triggerEvent('input', value);
      this.triggerEvent('change', value);
      this.setData({
        currentValue: value,
        showClear: this.getShowClear({ value: value })
      });
    },
    onFocus: function onFocus(event) {
      this.triggerEvent('focus', event);
      this.setData({
        focused: true,
        showClear: this.getShowClear({ focused: true })
      });
    },
    onBlur: function onBlur(event) {
      this.focused = false;
      this.triggerEvent('blur', event);
      this.setData({
        focused: false,
        showClear: this.getShowClear({ focused: false })
      });
    },
    onClickIcon: function onClickIcon() {
      this.triggerEvent('click-icon');
    },
    getShowClear: function getShowClear(options) {
      var _options$focused = options.focused,
          focused = _options$focused === undefined ? this.data.focused : _options$focused,
          _options$value = options.value,
          value = _options$value === undefined ? this.data.currentValue : _options$value;


      return this.data.clearable && focused && value !== '' && !this.data.readonly;
    },
    onClear: function onClear() {
      this.setData({
        currentValue: '',
        showClear: this.getShowClear({ value: '' })
      });
      this.triggerEvent('input', '');
      this.triggerEvent('change', '');
    },
    onConfirm: function onConfirm() {
      this.triggerEvent('confirm', this.data.currentValue);
    }
  }
});