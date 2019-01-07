import Page from '../../common/page';
import Toast from '../../dist/toast/toast';

Page({
  onChange(event) {
    Toast(`change: ${event.detail}`);
  }
});
