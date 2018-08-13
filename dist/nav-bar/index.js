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
    onClickLeft: function onClickLeft() {
      this.triggerEvent('click-left');
    },
    onClickRight: function onClickRight() {
      this.triggerEvent('click-right');
    }
  }
});