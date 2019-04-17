import Page from '../../common/page';
import Toast from '../../dist/toast/toast';

const citys = {
  '浙江': ['杭州', { text: '宁波', disabled: true }, '温州', '嘉兴', '湖州'],
  '福建': ['福州', '厦门', '莆田', '三明', '泉州']
};

Page({
  data: {
    column1: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    column2: citys['浙江'],
    column4: [
      {
        values: Object.keys(citys),
        className: 'column1'
      },
      {
        values: citys['浙江'],
        className: 'column2',
        defaultIndex: 2
      }
    ]
  },

  onChange1(event) {
    const { value, index } = event.detail;
    Toast(`Value: ${value}, Index：${index}`);
  },

  onConfirm(event) {
    const { value, index } = event.detail;
    Toast(`Value: ${value}, Index：${index}`);
  },

  onCancel() {
    Toast('取消');
  },

  onChange2(event) {
    const { picker, value } = event.detail;
    picker.setColumnValues(1, citys[value[0]]);
  }
});
