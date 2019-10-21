import Page from '../../common/page';

Page({
  data: {
    disableMenu: '禁用菜单',
    switchTitle1: '包邮',
    switchTitle2: '团购',
    itemTitle: '筛选',
    expandDirection: '向上展开',
    customContent: '自定义菜单内容',
    customActiveColor: '自定义选中态颜色',
    option1: [{ text: '全部商品', value: 0 }, { text: '新款商品', value: 1 }, { text: '活动商品', value: 2 }],
    option2: [{ text: '默认排序', value: 'a' }, { text: '好评排序', value: 'b' }, { text: '销量排序', value: 'c' }],
    switch1: true,
    switch2: false,
    value1: 0,
    value2: 'a'
  },

  onConfirm () {
    this.selectComponent('#item').toggle();
  },

  onSwitch1Change ({ detail }) {
    this.setData({ switch1: detail });
  },

  onSwitch2Change ({ detail }) {
    this.setData({ switch2: detail });
  }
});
