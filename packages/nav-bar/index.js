import { create } from '../utils/create';

create({
  externalClasses: [
    'custom-class',
    'title-class'
  ],

  props: {
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
    onClickLeft() {
      this.triggerEvent('click-left');
    },

    onClickRight() {
      this.triggerEvent('click-right');
    }
  }
});
