import Page from '../../common/page';
import Toast from '../../dist/toast/toast';

Page({
  data: {
    column1: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    column2: [
      { text: '杭州', disabled: true },
      { text: '宁波' },
      { text: '温州' }
    ],
    column3: {
      浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      福建: ['福州', '厦门', '莆田', '三明', '泉州']
    },
    column4: [
      {
        values: ['浙江', '福建'],
        className: 'column1'
      },
      {
        values: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
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
    picker.setColumnValues(1, this.data.column3[value[0]]);
    getApp().picker = picker;
  }
});
