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
    handleFieldChange(event) {
      const { detail = {} } = event;
      const { value = '' } = detail;
      this.setData({ value });

      this.triggerEvent('change', event);
    },

    handleFieldFocus(event) {
      this.triggerEvent('focus', event);
    },

    handleFieldBlur(event) {
      this.triggerEvent('blur', event);
    },

    updateIsLastElement(isLastField) {
      let showBorder = true;
      if (isLastField && this.data.mode === 'normal') {
        showBorder = false;
      }

      this.setData({
        showBorder
      });
    }
  }
});
