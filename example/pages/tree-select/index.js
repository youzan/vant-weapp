import Page from '../../common/page';
import config from './config';

Page({
  data: {
    items: [
      {
        // 导航名称
        text: '所有城市',
        // 该导航下所有的可选项
        children: [...config.pro1, ...config.pro2]
      }, {
        // 导航名称
        text: config.pro1Name,
        // 该导航下所有的可选项
        children: config.pro1
      }, {
        text: config.pro2Name,
        children: config.pro2
      }, {
        text: config.pro3Name,
        disabled: true,
        children: config.pro3
      }
    ],
    mainActiveIndex: 0
  },

  onClickNav({ detail }) {
    this.setData({
      mainActiveIndex: detail.index || 0
    });
  },

  onClickItem({ detail }) {
    // 多选
    if (!this.data.activeId) this.data.activeId = [];

    const idx = this.data.activeId.indexOf(detail.id);
    if (idx > -1) {
      this.data.activeId.splice(idx, 1);
    } else {
      this.data.activeId.push(detail.id);
    }

/*
    // 单选
    this.data.activeId = this.data.activeId === detail.id ? null : detail.id;
*/

    this.setData({
      activeId: this.data.activeId
    });
  }
});
