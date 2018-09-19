import Page from '../../common/page';
import Toast from '../../dist/toast/toast';

Page({
  onClickButton() {
    Toast('点击按钮');
  },
  onClickLink() {
    Toast('修改地址');
  }
});
