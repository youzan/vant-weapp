Component({
  externalClasses: ['custom-class'],
  relations: {
    '../btn-group/index': {
      type: 'parent',
      linked() {
        this.setData({ inGroup: true });
      },
      unlinked() {
        this.setData({ inGroup: false });
      }
    }
  },
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

  data: {
    inGroup: false,
    isLast: false
  },

  methods: {
    handleTap() {
      this.triggerEvent('btnclick');
    },

    switchLastButtonStatus(isLast = false) {
      this.setData({ isLast });
    }
  }
});
