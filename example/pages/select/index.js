var Zan = require('../../dist/index');

Page({

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
      color: -1,
      form: -1
    },

    activeColor: '#4b0'
  },

  handleSelectChange({ currentTarget = {}, detail = {} }) {
    const { value = '' } = detail;
    const { dataset = {} } = currentTarget;
    const type = dataset.type;
    this.setData({
      [`checked.${type}`]: value
    });
  }
});
