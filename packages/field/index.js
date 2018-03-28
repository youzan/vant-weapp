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
    error: Boolean
  },

  methods: {
    handleZanFieldChange(event) {
      console.info('[zan:field:change]', event);
      this.triggerEvent('change', event);
    },
  
    handleZanFieldFocus(event) {
      console.info('[zan:field:focus]', event);
  
      this.triggerEvent('focus', event);
    },
  
    handleZanFieldBlur(event) {
      console.info('[zan:field:blur]', event);
  
      this.triggerEvent('blur', event);
    }
  }
})
