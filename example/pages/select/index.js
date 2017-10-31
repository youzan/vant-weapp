var Zan = require('../../dist/index');

Page(Object.assign({}, Zan.CheckLabel, {

  data: {
    items: [
      {
        padding: 0,
        value: '1',
        name: '选项一',
      },
      {
        padding: 0,
        value: '2',
        name: '选项二',
      },
    ],

    checked: {
      base: -1,
      color: -1
    },

    activeColor: '#4b0'
  },

  handleZanSelectChange({ componentId, value }) {
    this.setData({
      [`checked.${componentId}`]: value
    });
  }
}));
