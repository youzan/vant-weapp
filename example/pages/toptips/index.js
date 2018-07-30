const Toptips = require('../../dist/toptips/toptips');

Page({
  data: {
    content: '测试toptips',
    duration: 2000,
    $vant: {
      toptips: {
        show: false
      }
    }
  },

  showTopTips() {
    this.setData({
      $vant: {
        toptips: {
          show: true
        }
      }
    });

    setTimeout(() => {
      this.setData({
        $vant: {
          toptips: {
            show: false
          }
        }
      });
    },this.data.duration);
  },

  showTopTips2() {
    Toptips('测试内容');
  },

  showTopTips3() {
    Toptips({
      duration: 1000,
      content: '测试时间1秒'
    })
  }
});
