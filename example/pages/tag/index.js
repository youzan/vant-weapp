import Page from '../../common/page';

Page({
  data: {
    show: {
      success: true,
      primary: true
    }
  },

  onClose(event) {
    this.setData({
      [`show.${event.target.id}`]: false
    });
  }
});
