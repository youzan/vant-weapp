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
    // 内容从哪个方向出，可选 center top bottom left right
    type: {
      type: String,
      value: 'center'
    }
  },

  methods: {
    handleMaskClick() {
      this.triggerEvent('clickmask', {});
    }
  }
});
