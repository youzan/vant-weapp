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
    cloudPath: []
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
    this.setData({ fileList6: [] });
    const uploadArray = [];
    if (!fileList.length) {
      wx.showToast({ title: '请选择图片', icon: 'none' });
    } else {
      fileList.map((file, index) => {
        uploadArray.push(this.uploadFilePromise(`my-photo${index}.png`, file));
        return null;
      });
      Promise.all(uploadArray).then((data) => {
        wx.showToast({ title: '上传成功', icon: 'none' });
        this.setData({ cloudPath: data, fileList6: [] });
      }).catch((e) => {
        console.log(e);
      });
    }
  },

  downloadFromCloud() {
    const { cloudPath } = this.data;
    if (!cloudPath.length) {
      wx.showToast({ title: '请先上传图片', icon: 'none' });
    } else {
      this.downloadFile(cloudPath[0].fileID);
    }
  },

  uploadFilePromise(fileName, chooseResult) {
    return wx.cloud.uploadFile({
      cloudPath: fileName,
      filePath: chooseResult.path,
    });
  },

  downloadFile(fileID) {
    wx.cloud.downloadFile({
      fileID,
      success: res => {
        this.setData({
          fileList6: [{ url: res.tempFilePath }]
        });
        setTimeout(() => {
          this.setData({
            fileList6: []
          });
        }, 2000);
      },
      fail: console.error
    });
  },

  uploadFile(fileName, chooseResult) {
    return wx.cloud.uploadFile({
      // 指定上传到的云路径
      cloudPath: fileName,
      // 指定要上传的文件的小程序临时文件路径
      filePath: chooseResult.path,
      success: res => {
        wx.showToast({ title: '上传成功', icon: 'none' });
        console.log(res);
      },
      fail: res => {
        console.log(res);
      }
    });
  },
});
