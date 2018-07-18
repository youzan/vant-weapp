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

      this.triggerEvent('change', event);
    },
    handleFieldFocus: function handleFieldFocus(event) {
      this.triggerEvent('focus', event);
    },
    handleFieldBlur: function handleFieldBlur(event) {
      this.triggerEvent('blur', event);
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