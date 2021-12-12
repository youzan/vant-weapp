import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';
import icons from '@vant/icons/src/config';

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

VantComponent({
  data: {
    active: 1,
    steps,
    customIconSteps: steps.map((item, index) => ({
      ...item,
      inactiveIcon: icons.outline[index],
      activeIcon: icons.basic[index],
    })),
  },

  methods: {
    nextStep() {
      this.setData({
        active: ++this.data.active % 4,
      });
    },

    onClick(event) {
      Toast({
        context: this,
        message: `Index: ${event.detail}`,
      });
    },
  },
});
