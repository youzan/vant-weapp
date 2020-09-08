import Page from '../../common/page';
import config from './config';

const items = [
  {
    text: config.pro1Name,
    children: config.pro1,
  },
  {
    text: config.pro2Name,
    children: config.pro2,
  },
  {
    text: config.pro3Name,
    disabled: true,
    children: config.pro3,
  },
];

Page({
  data: {
    items,
    badgeItems: items.slice(0, 2).map((item, index) => {
      if (index === 0) {
        return { ...item, dot: true };
      }
      if (index === 1) {
        return { ...item, badge: 5 };
      }

      return item;
    }),
    mainActiveIndex: 0,
    activeId: 0,
    mainActiveIndexMulti: 0,
    activeIdMulti: [],
  },

  onClickNav({ detail }) {
    this.setData({
      mainActiveIndex: detail.index || 0,
    });
  },

  onClickItem({ detail }) {
    const activeId = this.data.activeId === detail.id ? null : detail.id;

    this.setData({ activeId });
  },

  onClickNavMulti({ detail }) {
    this.setData({
      mainActiveIndexMulti: detail.index || 0,
    });
  },

  onClickItemMulti({ detail }) {
    const { activeIdMulti } = this.data;
    const idx = activeIdMulti.indexOf(detail.id);
    if (idx > -1) {
      activeIdMulti.splice(idx, 1);
    } else {
      activeIdMulti.push(detail.id);
    }

    this.setData({ activeIdMulti });
  },
});
