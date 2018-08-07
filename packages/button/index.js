const nativeBehaviors = require('./behaviors');
const classnames = require('../common/classnames');

const observer = function() {
  this.setClasses();
};

Component({
  externalClasses: ['custom-class', 'loading-class'],

  behaviors: [nativeBehaviors],

  properties: {
    type: {
      type: String,
      value: 'default',
      observer
    },
    size: {
      type: String,
      value: 'normal',
      observer
    },
    plain: {
      type: Boolean,
      value: false,
      observer
    },
    disabled: {
      type: Boolean,
      value: false,
      observer
    },
    loading: {
      type: Boolean,
      value: false,
      observer
    },
    block: {
      type: Boolean,
      value: false,
      observer
    }
  },

  attached() {
    this.setClasses();
  },

  methods: {
    onTap(event) {
      if (!this.data.disabled && !this.data.loading) {
        this.triggerEvent('tap', event);
      }
    },

    setClasses() {
      const { type, size, plain, disabled, loading, block } = this.data;
      this.setData({
        classes: classnames(`van-button--${type}`, `van-button--${size}`, {
          'van-button--block': block,
          'van-button--plain': plain,
          'van-button--loading': loading,
          'van-button--disabled': disabled,
          'van-button--untapable': disabled || loading
        })
      });
    }
  }
});
