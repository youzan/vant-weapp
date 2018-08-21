const buttonBehaviors = require('../behaviors/button');
const classnames = require('../common/classnames');

const observer = function() {
  this.setClasses();
};

Component({
  options: {
    addGlobalClass: true
  },

  externalClasses: ['custom-class', 'loading-class'],

  behaviors: [buttonBehaviors],

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
      observer
    },
    disabled: {
      type: Boolean,
      observer
    },
    loading: {
      type: Boolean,
      observer
    },
    block: {
      type: Boolean,
      observer
    },
    square: {
      type: Boolean,
      observer
    }
  },

  attached() {
    this.setClasses();
  },

  methods: {
    onClick() {
      if (!this.data.disabled && !this.data.loading) {
        this.triggerEvent('click');
      }
    },

    setClasses() {
      const { type, size, plain, disabled, loading, square, block } = this.data;
      this.setData({
        classes: classnames(`van-button--${type}`, `van-button--${size}`, {
          'van-button--block': block,
          'van-button--plain': plain,
          'van-button--square': square,
          'van-button--loading': loading,
          'van-button--disabled': disabled,
          'van-button--unclickable': disabled || loading
        })
      });
    }
  }
});
