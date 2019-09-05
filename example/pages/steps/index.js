import Page from '../../common/page';

Page({
  data: {
    active: 1,
    steps: [
      {
        text: '步骤一',
        desc: '描述信息'
      },
      {
        text: '步骤二',
        desc: '描述信息'
      },
      {
        text: '步骤三',
        desc: '描述信息'
      },
      {
        text: '步骤四',
        desc: '描述信息'
      }
    ]
  },

  nextStep() {
    this.setData({
      active: ++this.data.active % 4
    });
  }
});
