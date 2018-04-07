Component({
  properties: {
    items: {
      type: Array,
      value: []
    }
  },

  methods: {
    _handleZanSelectChange(e) {
      const value = e.detail.value;
      this.triggerEvent('change', event, { value });
    }
  }
});
