Component({
  behaviors: ['wx://form-field'],

  options: {
    addGlobalClass: true
  },

  externalClasses: ['custom-class', 'node-class'],

  properties: {
    loading: Boolean,
    disabled: Boolean,
    checked: {
      type: Boolean,
      observer(value) {
        this.setData({ value });
      }
    },
    size: {
      type: String,
      value: '30px'
    }
  },

  attached() {
    this.setData({ value: this.data.checked });
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
