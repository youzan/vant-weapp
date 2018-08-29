Component({
  behaviors: ['wx://form-field'],

  options: {
    addGlobalClass: true
  },

  properties: {
    title: String,
    border: Boolean,
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
      value: '26px'
    }
  },

  attached() {
    this.setData({ value: this.data.checked });
  },

  methods: {
    onChange(event) {
      this.triggerEvent('change', event.detail);
    }
  }
});
