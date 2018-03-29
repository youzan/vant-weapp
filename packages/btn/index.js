
Component({
  externalClasses: ['custom-class'],
  properties: {
    type: {
      type: String,
      value: '',
    },
    size: {
      type: String,
      value: '',
    },
    plain: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    loading: {
      type: Boolean,
      value: false,
    },
    openType: {
      type: String,
      value: ''
    }
  },
  methods: {
    handleTap() {
      this.triggerEvent('btnclick');
    }
  }
});