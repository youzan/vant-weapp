Component({
  properties: {
    checked: {
      type: Boolean,
      value: false
    },

    loading: {
      type: Boolean,
      value: false
    },

    disabled: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    handleZanSwitchChange(event) {
      if (this.data.loading || this.data.disabled) {
        return;
      }
      let checked = !this.data.checked;
      this.triggerEvent('change', {
        checked,
        loading: this.data.loading
      });
    }
  }
});
