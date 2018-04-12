Component({
  properties: {
    items: {
      type: Array,
      value: []
    },
    name: {
      type: String,
      value: ''
    },
    checkedValue: {
      type: String,
      value: ''
    },
    activeColor: {
      type: String,
      value: '#ff4444'
    }
  },

  methods: {
    _handleZanSelectChange(e) {
      const value = e.detail.value;
      this.triggerEvent('change', event, { value });
    }
  }
});
