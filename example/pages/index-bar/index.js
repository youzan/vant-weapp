import Page from '../../common/page';

const indexList = [];
const charCodeOfA = 'A'.charCodeAt(0);
for (let i = 0; i < 26; i++) {
  indexList.push(String.fromCharCode(charCodeOfA + i));
}

Page({
  data: {
    activeTab: 0,
    indexList,
    customIndexList: [1, 2, 3, 4, 5, 6, 8, 9, 10],
    scrollTop: 0,
  },

  onChange(event) {
    this.setData({
      activeTab: event.detail.name
    });
  },

  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });
  }
});
