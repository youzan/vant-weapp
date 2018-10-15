import Page from '../../common/page';
import Toast from '../../dist/toast/toast';

Page({
  onClickIcon() {
    Toast('点击图标');
  },

  onClickButton() {
    Toast('点击按钮');
  }
});
