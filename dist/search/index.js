Component({
  behaviors: ['wx://form-field'],

  externalClasses: ['custom-class', 'cancel-class'],

  options: {
    multipleSlots: true,
    addGlobalClass: true
  },

  properties: {
    focus: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    showAction: Boolean,
    useActionSlot: Boolean,
    placeholder: String,
    background: {
      type: String,
      value: '#f2f2f2'
    },
    maxlength: {
      type: Number,
      value: -1
    }
  },

  methods: {
    onChange(event) {
      this.triggerEvent('change', event.detail);
    },

    onCancel() {
      this.setData({ value: '' });
      this.triggerEvent('cancel');
      this.triggerEvent('change', '');
    },

    onSearch() {
      this.triggerEvent('search', this.data.value);
    },

    onFocus() {
      this.triggerEvent('focus');
    },

    onBlur() {
      this.triggerEvent('blur');
    }
  }
});
