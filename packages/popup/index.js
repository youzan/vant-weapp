Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    },

    overlay: {
      type: Boolean,
      value: true
    },

    closeOnClickOverlay: {
      type: Boolean,
      value: true
    },

    // 弹出方向
    type: {
      type: String,
      value: 'center'
    }
  },

  methods: {
    handleMaskClick() {
      this.triggerEvent('click-overlay', {});

      if (!this.data.closeOnClickOverlay) {
        return;
      }
      this.triggerEvent('close', {});
    }
  }
});
