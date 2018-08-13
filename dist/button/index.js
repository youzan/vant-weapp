'use strict';

var nativeBehaviors = require('./behaviors');
var classnames = require('../common/classnames');

var observer = function observer() {
  this.setClasses();
};

Component({
  externalClasses: ['custom-class', 'loading-class'],

  behaviors: [nativeBehaviors],

  properties: {
    type: {
      type: String,
      value: 'default',
      observer: observer
    },
    size: {
      type: String,
      value: 'normal',
      observer: observer
    },
    plain: {
      type: Boolean,
      observer: observer
    },
    disabled: {
      type: Boolean,
      observer: observer
    },
    loading: {
      type: Boolean,
      observer: observer
    },
    block: {
      type: Boolean,
      observer: observer
    }
  },

  attached: function attached() {
    this.setClasses();
  },


  methods: {
    onClick: function onClick() {
      if (!this.data.disabled && !this.data.loading) {
        this.triggerEvent('click');
      }
    },
    setClasses: function setClasses() {
      var _data = this.data,
          type = _data.type,
          size = _data.size,
          plain = _data.plain,
          disabled = _data.disabled,
          loading = _data.loading,
          block = _data.block;

      this.setData({
        classes: classnames('van-button--' + type, 'van-button--' + size, {
          'van-button--block': block,
          'van-button--plain': plain,
          'van-button--loading': loading,
          'van-button--disabled': disabled,
          'van-button--unclickable': disabled || loading
        })
      });
    }
  }
});