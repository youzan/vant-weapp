Page({
  data: {
    show: false,
    cancelWithMask: true,
    actions: [{
      name: '选项1',
      subname: '选项描述语1',
      className: 'action-class',
      loading: false
    }, {
      name: '选项2',
      subname: '选项描述语2',
      className: 'action-class',
      loading: false
    }, {
      name: '去分享',
      openType: 'share'
    }],
    cancelText: '关闭 Action'
  },

  onShareAppMessage() {
    return {
      title: 'ZanUI-WeApp',
      imageUrl: 'https://img.yzcdn.cn/public_files/2017/02/06/ee0ebced79a80457d77ce71c7d414c74.png'
    };
  },

  openActionsheet() {
    this.setData({
      'show': true
    });
  },

  closeActionSheet() {
    this.setData({
      'show': false
    });
  },

  clickAction({ detail }) {
    // 如果是分享按钮被点击, 不处理关闭
    const { index } = detail;
    if (index === 2) {
      return;
    }
    this.setData({
      [`actions[${index}].loading`]: true
    });
    setTimeout(() => {
      this.setData({
        [`show`]: false,
        [`actions[${index}].loading`]: false
      });
    }, 1500);
  }
});
