Component({
  externalClasses: [
    'custom-class',
    'title-class'
  ],

  options: {
    multipleSlots: true,
    addGlobalClass: true
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
    onClickLeft() {
      this.triggerEvent('click-left');
    },

    onClickRight() {
      this.triggerEvent('click-right');
    }
  }
});
