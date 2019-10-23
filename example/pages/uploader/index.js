import Page from '../../common/page';

Page({
  data: {
    fileList1: [],
    fileList2: [
      { url: 'https://img.yzcdn.cn/vant/cat.jpeg', name: '图片1' },
      { url: 'http://iph.href.lu/60x60?text=default', name: '图片2', isImage: true }
    ],
    fileList3: [],
    fileList4: [],
    fileList5: []
  },

  beforeRead(event) {
    const { file, callback = () => {} } = event.detail;
    if (file.path.indexOf('jpeg') < 0) {
      wx.showToast({ title: '请选择jpg图片上传', icon: 'none' });
      callback(false);
      return;
    }
    callback(true);
  },

  afterRead(event) {
    const { file, name } = event.detail;
    const fileList = this.data[`fileList${name}`];

    this.setData({ [`fileList${name}`]: fileList.concat(file) });
  },

  oversize() {
    wx.showToast({ title: '文件超出大小限制', icon: 'none' });
  },

  delete(event) {
    const { index, name } = event.detail;
    const fileList = this.data[`fileList${name}`];
    fileList.splice(index, 1);
    this.setData({ [`fileList${name}`]: fileList });
  },

  clickPreview() {}
});
