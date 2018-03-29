
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