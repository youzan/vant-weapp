import Page from '../../common/page';

Page({
  data: {
    active1: [0],
    active2: 0,
    active3: [],
    title1: '有赞微商城',
    title2: '有赞零售',
    title3: '有赞美业',
    content1: '提供多样店铺模板，快速搭建网上商城',
    content2: '网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失',
    content3: '线上拓客，随时预约，贴心顺手的开单收银'
  },
  onChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail
    });
  }
});
