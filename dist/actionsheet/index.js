Component({
  externalClasses: ['mask-class', 'container-class'],
  properties: {
    actions: {
      type: Array,
      value: []
    },
    show: {
      type: Boolean,
      value: false
    },
    cancelWithMask: {
      type: Boolean,
      value: true
    },
    cancelText: {
      type: String,
      value: ''
    }
  },
  methods: {
    onMaskClick() {
      if (this.data.cancelWithMask) {
        this.cancelClick();
      }
    },
    cancelClick() {
      this.triggerEvent('cancel');
    },
    handleBtnClick({ currentTarget = {} }) {
      const dataset = currentTarget.dataset || {};
      const { index } = dataset;
      this.triggerEvent('actionclick', { index });
    }
  }
});
