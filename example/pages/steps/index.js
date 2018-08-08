const Toast = require('../../dist/toast/toast');

Page({
  data: {
    steps: [
      {
        id: 'step-1',
        current: true,
        done: true,
        text: '步骤一',
        desc: '10.01'
      },
      {
        id: 'step-2',
        done: false,
        current: false,
        text: '步骤二',
        desc: '10.02'
      },
      {
        done: false,
        current: false,
        text: '步骤三'
      }
    ],
    steps2: [
      {
        current: false,
        done: true,
        text: '步骤一',
        desc: '10.01'
      },
      {
        done: true,
        current: true,
        text: '步骤二',
        desc: '10.02'
      },
      {
        done: false,
        current: false,
        text: '步骤三',
        desc: '10.03'
      }
    ],
    steps3: [
      {
        current: false,
        done: true,
        text: '步骤一',
        desc: '10.01'
      },
      {
        done: true,
        current: false,
        text: '步骤二',
        desc: '10.02'
      },
      {
        done: true,
        current: true,
        text: '步骤三',
        desc: '10.03'
      }
    ],
    steps4: [
      {
          current: true,
          done: false,
          text: '步骤一',
          desc: '10.01'
        },
        {
          done: false,
          current: false,
          text: '步骤二',
          desc: '10.02'
        }
    ],
    steps5: [
      {
          done: true,
          current: false,
          text: '步骤一',
          desc: '10.01'
        },
        {
          done: false,
          current: true,
          text: '步骤二',
          desc: '10.02'
        }
    ]
  },

  handleTap(event) {
    let message;
    if (event.detail.id) {
      message = `选中元素的id为${event.detail.id}`;
    } else {
      message = '选中元素没有id';
    }
    Toast({
      message,
      selector: '#tap',
    });
  },

  onLoad() {

  },

  onShow() {
  },
});
