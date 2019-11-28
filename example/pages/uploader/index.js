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
    fileList6: []
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
    const fileList = this.data.fileList6;
    const uploadArray = [];
    fileList.map((file, index) => {
      uploadArray.push(this.uploadFilePromise(`my-photo${index}.png`, file));
      return null;
    });
    let cloudPath;
    Promise.all(uploadArray).then((data) => {
      cloudPath = data;
      wx.showToast({ title: '上传成功', icon: 'none' });
      console.log(cloudPath);
    }).catch((e) => {
      console.log(e);
    });
  },

  uploadFilePromise(fileName, chooseResult) {
    return wx.cloud.uploadFile({
      cloudPath: fileName,
      filePath: chooseResult.path,
    });
  },

  uploadFile(fileName, chooseResult) {
    wx.cloud.init();
    return wx.cloud.uploadFile({
      // 指定上传到的云路径
      cloudPath: fileName,
      // 指定要上传的文件的小程序临时文件路径
      filePath: chooseResult.path,
      success: res => {
        wx.showToast({ title: '上传成功', icon: 'none' });
        return res;
      },
      fail: res => {
        res.fileName = fileName;
        return res;
      }
    });
  },
});
