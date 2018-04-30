Component({
  properties: {
    title: String,
    name: String,
    type: {
      type: String,
      value: 'input'
    },
    name: String,
    value: String,
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
    handleZanFieldChange(event) {
      
      this.triggerEvent('change', event);
    },

    handleZanFieldFocus(event) {
      

      this.triggerEvent('focus', event);
    },

    handleZanFieldBlur(event) {
      

      this.triggerEvent('blur', event);
    }
  }
});
