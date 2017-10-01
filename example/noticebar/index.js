var Zan = require('../../dist/index');

Page(Object.assign({}, Zan.NoticeBar, {
  data: {
    movable: {
      text: '足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。',
      animationData: {}
    },
    static: {
      text: '足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。'
    }
  },
  onShow() {
    this.initZanNoticeBarScroll('movable')
  }
}))
