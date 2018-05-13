Component({
  behaviors: ['wx://form-field'],

  properties: {
    title: String,
    type: {
      type: String,
      value: 'input'
    },
    disabled: Boolean,
    inputType: {
      type: String,
      value: 'text'
    },
    placeholder: String,
    focus: Boolean,
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
    }
  }
});
