
import Page from '../../common/page';

Page({
  data: {
    show1: false,
    show2: false,
    show3: false
  },

  onLoad() {
    this.setData({
      actions: [
        { name: '选项' },
        { name: '选项', subname: '禁用' },
        { name: '选项', loading: true },
        { name: '禁用选项', disabled: true }
      ]
    });
  },

  toggle(type) {
    this.setData({
      [type]: !this.data[type]
    });
  },

  toggleActionsheet1() {
    this.toggle('show1');
  },

  toggleActionsheet2() {
    this.toggle('show2');
  },

  toggleActionsheet3() {
    this.toggle('show3');
  }
});
