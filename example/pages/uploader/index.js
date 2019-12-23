import Page from '../../common/page';

Page({
  data: {
    fileList: [],
    fileList2: [
      { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
      { url: 'https://img.yzcdn.cn/vant/tree.jpg' }
    ],
    fileList3: [{ url: 'https://img.yzcdn.cn/vant/sand.jpg' }],
    fileList4: [],
    fileList5: [],
    fileList6: [],
    cloudPath: [],
    fileList7: []
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

  clickPreview() {},

  uploadToCloud() {
    wx.cloud.init();
    const { fileList6: fileList = [] } = this.data;
    if (!fileList.length) {
      wx.showToast({ title: '请选择图片', icon: 'none' });
    } else {
      const uploadTasks = fileList.map((file, index) =>
        this.uploadFilePromise(`my-photo${index}.png`, file)
      );
      Promise.all(uploadTasks)
        .then(data => {
          wx.showToast({ title: '上传成功', icon: 'none' });
          const fileList = data.map(item => ({ url: item.fileID }));
          this.setData({ cloudPath: data, fileList6: fileList });
        })
        .catch(e => {
          wx.showToast({ title: '上传失败', icon: 'none' });
          console.log(e);
        });
    }
  },

  uploadFilePromise(fileName, chooseResult) {
    return wx.cloud.uploadFile({
      cloudPath: fileName,
      filePath: chooseResult.path
    });
  }
});
