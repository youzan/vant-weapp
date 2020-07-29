import Page from '../../common/page';

Page({
  data: {
    show: false,
    name: 'fade',
    showCustom: false
  },

  onClickFade() {
    this.trigger('fade');
  },

  onClickFadeUp() {
    this.trigger('fade-up');
  },

  onClickFadeDown() {
    this.trigger('fade-down');
  },

  onClickFadeLeft() {
    this.trigger('fade-left');
  },

  onClickFadeRight() {
    this.trigger('fade-right');
  },

  onClickSlideUp() {
    this.trigger('slide-up');
  },

  onClickSlideDown() {
    this.trigger('slide-down');
  },

  onClickSlideLeft() {
    this.trigger('slide-left');
  },

  onClickSlideRight() {
    this.trigger('slide-right');
  },

  trigger(name) {
    this.setData({ name, show: true });
    setTimeout(() => {
      this.setData({ show: false });
    }, 500);
  },

  onClickCustom() {
    this.setData({ showCustom: true });

    setTimeout(() => {
      this.setData({ showCustom: false });
    }, 1000);
  },

  onBeforeEnter() {
    console.log('before enter');
  },

  onEnter() {
    console.log('enter');
  },

  onAfterEnter() {
    console.log('after enter');
  },

  onBeforeLeave() {
    console.log('before leave');
  },

  onLeave() {
    console.log('leave');
  },

  onAfterLeave() {
    console.log('after leave');
  },
});
