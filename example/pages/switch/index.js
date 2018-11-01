import Page from '../../common/page';
import Dialog from '../../dist/dialog/dialog';

Page({
  data: {
    checked: true,
    checked2: true
  },

  onChange({ detail }) {
    this.setData({ checked: detail });
  },

  onChange2({ detail }) {
    Dialog.confirm({
      title: '提示',
      message: '是否切换开关？'
    }).then((res) => {
      this.setData({ checked2: detail });
    });
  }
});
