import Page from '../../common/page';

Page({
  data: {
    show: {
      middle: false,
      top: false,
      bottom: false,
      right: false,
      right2: false
    }
  },

  toggle(type) {
    this.setData({
      [`show.${type}`]: !this.data.show[type]
    });
  },

  togglePopup() {
    this.toggle('middle');
  },

  toggleRightPopup() {
    this.toggle('right');
  },

  toggleRightPopup2() {
    this.toggle('right2');
  },

  toggleBottomPopup() {
    this.toggle('bottom');
  },

  toggleTopPopup() {
    this.toggle('top');
    setTimeout(() => {
      this.toggle('top');
    }, 2000);
  }
});
