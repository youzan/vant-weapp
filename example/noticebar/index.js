var Zan = require('../../dist/index');

Page(Object.assign({}, Zan.NoticeBar, {
  data: {
    movable: {
      text: '足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。'
    },
    static1: {
      text: '足协杯战线连续第2年上演广州德比战'
    },
    static2: {
      text: '足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。'
    }
  },
  onShow() {
    // 滚动通告栏需要initScroll
    this.initZanNoticeBarScroll('movable');
    // initScroll的通告栏如果宽度足够显示内容将保持静止
    this.initZanNoticeBarScroll('static1');
    // 不进行initScroll的通告栏也将保持静止
    // this.initZanNoticeBarScroll('static2');
  }
}))
