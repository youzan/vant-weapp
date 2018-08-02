'use strict';

Component({
  behaviors: ['wx://form-field'],

  externalClasses: ['field-class'],

  relations: {
    '../cell-group/index': {
      type: 'parent'
    }
  },

  properties: {
    title: String,
    type: {
      type: String,
      value: 'input'
    },
    disabled: Boolean,
    focus: Boolean,
    inputType: {
      type: String,
      value: 'text'
    },
    placeholder: String,
    mode: {
      type: String,
      value: 'normal'
    },
    right: Boolean,
    error: Boolean,
    maxlength: {
      type: Number,
      value: 140
    }
  },

  data: {
    showBorder: true
  },

  methods: {
    handleFieldChange: function handleFieldChange(event) {
      var _event$detail = event.detail,
          detail = _event$detail === undefined ? {} : _event$detail;
      var _detail$value = detail.value,
          value = _detail$value === undefined ? '' : _detail$value;

      this.setData({ value: value });

      this.triggerEvent('change', Object.assign({}, detail));
    },
    handleFieldFocus: function handleFieldFocus(_ref) {
      var _ref$detail = _ref.detail,
          detail = _ref$detail === undefined ? {} : _ref$detail;

      this.triggerEvent('focus', Object.assign({}, detail));
    },
    handleFieldBlur: function handleFieldBlur(_ref2) {
      var _ref2$detail = _ref2.detail,
          detail = _ref2$detail === undefined ? {} : _ref2$detail;

      this.triggerEvent('blur', Object.assign({}, detail));
    },
    updateIsLastElement: function updateIsLastElement(isLastField) {
      var showBorder = true;
      if (isLastField && this.data.mode === 'normal') {
        showBorder = false;
      }

      this.setData({
        showBorder: showBorder
      });
    }
  }
});