var app = getApp()

Page({
  data: {
    steps: [
      {
        current: false,
        done: true,
        text: '步骤一'
      },
      {
        done: true,
        current: true,
        text: '步骤二'
      },
      {
        done: false,
        current: false,
        text: '步骤三'
      }
    ]
  },

  onLoad: function () {

  },

  onShow: function() {
  },
})
