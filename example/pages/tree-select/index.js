const config = require('./config');

Page({
  data: {
    items: [
      {
        // 导航名称
        text: '所有城市',
        // 该导航下所有的可选项
        children: [ ...config.pro1, ...config.pro2 ]
      }, {
        // 导航名称
        text: config.pro1Name,
        // 该导航下所有的可选项
        children: config.pro1
      }, {
        text: config.pro2Name,
        children: config.pro2
      }
    ],
    
    mainActiveIndex: 0,

    activeId: 1002
  },

  handleNavClick({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0
    });
  },

  handleItemClick({ detail = {} }) {
    this.setData({
      activeId: detail.id
    });
  }
});
