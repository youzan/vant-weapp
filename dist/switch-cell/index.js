Component({
  options: {
    addGlobalClass: true
  },

  properties: {
    title: String,
    checked: Boolean,
    border: Boolean,
    loading: Boolean,
    disabled: Boolean,
    size: {
      type: String,
      value: '26px'
    }
  },

  methods: {
    onChange(event) {
      this.triggerEvent('change', event.detail);
    }
  }
});
