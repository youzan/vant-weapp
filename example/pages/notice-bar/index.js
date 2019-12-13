import Page from '../../common/page';

Page({
  data: {
    text: '足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。',
    speedValue: 80
  },
  onChange(event) {
    this.setData({
      speedValue: event.detail
    });
  }
});
