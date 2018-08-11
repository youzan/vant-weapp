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
      value: false,
      observer: observer
    },
    disabled: {
      type: Boolean,
      value: false,
      observer: observer
    },
    loading: {
      type: Boolean,
      value: false,
      observer: observer
    },
    block: {
      type: Boolean,
      value: false,
      observer: observer
    }
  },

  attached: function attached() {
    this.setClasses();
  },


  methods: {
    onTap: function onTap(event) {
      if (!this.data.disabled && !this.data.loading) {
        this.triggerEvent('tap', event);
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
          'van-button--untapable': disabled || loading
        })
      });
    }
  }
});