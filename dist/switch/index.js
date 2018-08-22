Component({
  options: {
    addGlobalClass: true
  },

  externalClasses: ['custom-class', 'node-class'],

  properties: {
    checked: Boolean,
    loading: Boolean,
    disabled: Boolean,
    size: {
      type: String,
      value: '30px'
    }
  },

  methods: {
    onClick() {
      if (!this.data.disabled && !this.data.loading) {
        const checked = !this.data.checked;
        this.triggerEvent('input', checked);
        this.triggerEvent('change', checked);
      }
    }
  }
});
