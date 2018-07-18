'use strict';

var nativeButtonBehavior = require('./native-button-behaviors');

Component({
  externalClasses: ['custom-class', 'theme-class'],
  behaviors: [nativeButtonBehavior],
  relations: {
    '../btn-group/index': {
      type: 'parent',
      linked: function linked() {
        this.setData({ inGroup: true });
      },
      unlinked: function unlinked() {
        this.setData({ inGroup: false });
      }
    }
  },
  properties: {
    type: {
      type: String,
      value: ''
    },
    size: {
      type: String,
      value: ''
    },
    plain: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    },
    loading: {
      type: Boolean,
      value: false
    }
  },

  data: {
    inGroup: false,
    isLast: false
  },

  methods: {
    handleTap: function handleTap() {
      if (this.data.disabled) {
        this.triggerEvent('disabledclick');
        return;
      }
      this.triggerEvent('btnclick');
    },
    switchLastButtonStatus: function switchLastButtonStatus() {
      var isLast = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      this.setData({ isLast: isLast });
    }
  }
});