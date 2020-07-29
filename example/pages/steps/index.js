import Page from '../../common/page';
import Toast from '../../dist/toast/toast';
import icons from '../../dist/@vant/icons/src/config';

const steps = [
  {
    text: '步骤一',
    desc: '描述信息',
  },
  {
    text: '步骤二',
    desc: '描述信息',
  },
  {
    text: '步骤三',
    desc: '描述信息',
  },
  {
    text: '步骤四',
    desc: '描述信息',
  },
];

Page({
  data: {
    active: 1,
    steps,
    customIconSteps: steps.map((item, index) => ({
      ...item,
      inactiveIcon: icons.outline[index],
      activeIcon: icons.basic[index],
    })),
  },

  nextStep() {
    this.setData({
      active: ++this.data.active % 4,
    });
  },

  onClick(event) {
    Toast(`Index: ${event.detail}`);
  },
});
