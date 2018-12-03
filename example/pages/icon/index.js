import Page from '../../common/page';
import config from './config';

const basic = config.basic.map(item => item.css);
const outline = config.outline.map(item => item.css);
const filled = config.filled.map(item => item.css);

Page({
  data: {
    basic,
    outline,
    filled,
    active: 0
  },

  onSwitch(event) {
    this.setData({
      active: event.detail.index
    });
  }
});
