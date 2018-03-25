Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    handleMaskClick() {
      this.triggerEvent('clickmask', {});
    }
  }
});
