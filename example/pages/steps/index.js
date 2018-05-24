Page({
  data: {
    steps: [
      {
        current: true,
        done: true,
        text: '步骤一',
        desc: '10.01'
      },
      {
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

  onLoad() {

  },

  onShow() {
  },
});
