import Page from '../../common/page';
import Toast from '../../dist/toast/toast';

Page({
  data: {
    value: 1
  },

  onChange(event) {
    Toast.loading({
      forbidClick: true
    });

    setTimeout(() => {
      Toast.clear();
      this.setData({ value: event.detail });
    }, 500);
  }
});
