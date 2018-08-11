'use strict';

Component({
  externalClasses: ['custom-class', 'title-class'],

  options: {
    multipleSlots: true
  },

  properties: {
    title: String,
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    fixed: Boolean,
    zIndex: {
      type: Number,
      value: 1
    }
  },

  methods: {
    onTapLeft: function onTapLeft() {
      this.triggerEvent('tap-left');
    },
    onTapRight: function onTapRight() {
      this.triggerEvent('tap-right');
    }
  }
});