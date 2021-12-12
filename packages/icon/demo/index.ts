import { VantComponent } from '../../common/component';
import icons from '@vant/icons/src/config';

VantComponent({
  data: {
    icons,
    active: 0,
    demoIcon: 'chat-o',
    demoImage: 'https://b.yzcdn.cn/vant/icon-demo-1126.png',
  },

  methods: {
    onSwitch(event) {
      this.setData({
        active: event.detail.index,
      });
    },
  },
});
