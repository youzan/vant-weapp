import Page from '../../common/page';

Page({
  data: {
    show: {
      basic: false,
      top: false,
      bottom: false,
      left: false,
      right: false,
      round: false,
      closeIcon: false,
      customCloseIcon: false,
      customIconPosition: false
    }
  },

  toggle(type, show) {
    this.setData({
      [`show.${type}`]: show
    });
  },

  showBasic() {
    this.toggle('basic', true);
  },

  hideBasic() {
    this.toggle('basic', false);
  },

  showTop() {
    this.toggle('top', true);
  },

  hideTop() {
    this.toggle('top', false);
  },

  showLeft() {
    this.toggle('left', true);
  },

  hideLeft() {
    this.toggle('left', false);
  },

  showRight() {
    this.toggle('right', true);
  },

  hideRight() {
    this.toggle('right', false);
  },

  showBottom() {
    this.toggle('bottom', true);
  },

  hideBottom() {
    this.toggle('bottom', false);
  },

  showRound() {
    this.toggle('round', true);
  },

  hideRound() {
    this.toggle('round', false);
  },

  showCloseIcon() {
    this.toggle('closeIcon', true);
  },

  hideCloseIcon() {
    this.toggle('closeIcon', false);
  },

  showCustomCloseIcon() {
    this.toggle('customCloseIcon', true);
  },

  hideCustomCloseIcon() {
    this.toggle('customCloseIcon', false);
  },

  showCustomIconPosition() {
    this.toggle('customIconPosition', true);
  },

  hideCustomIconPosition() {
    this.toggle('customIconPosition', false);
  }
});
