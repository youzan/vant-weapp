Component({
  externalClasses: ['custom-class', 'cancel-class'],

  options: {
    multipleSlots: true,
    addGlobalClass: true
  },

  properties: {
    disabled: Boolean,
    readonly: Boolean,
    showAction: Boolean,
    useActionSlot: Boolean,
    placeholder: String,
    value: {
      type: String,
      observer(currentValue) {
        this.setData({ currentValue });
      }
    },
    background: {
      type: String,
      value: '#f2f2f2'
    },
    maxlength: {
      type: Number,
      value: -1
    }
  },

  attached() {
    this.setData({ currentValue: this.data.value });
  },

  methods: {
    onChange(event) {
      this.triggerEvent('change', event.detail);
    },

    onCancel() {
      this.setData({ currentValue: '' });
      this.triggerEvent('cancel');
      this.triggerEvent('change', '');
    },

    onSearch() {
      this.triggerEvent('search', this.data.currentValue);
    },

    onFocus() {
      this.triggerEvent('focus');
    },

    onBlur() {
      this.triggerEvent('blur');
    }
  }
});
