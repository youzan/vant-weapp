import { VantComponent } from '../../common/component';
import Toast from '../../toast/toast';

VantComponent({
  data: {
    active1: [0],
    active2: 0,
    active3: [],
    active4: [],
    title1: '标题1',
    title2: '标题2',
    title3: '标题3',
    content1: '代码是写出来给人看的，附带能在机器上运行',
    content2: '代码是写出来给人看的，附带能在机器上运行',
    content3: '代码是写出来给人看的，附带能在机器上运行',
  },

  methods: {
    onChange(event) {
      const { key } = event.currentTarget.dataset;
      this.setData({
        [key]: event.detail,
      });
    },

    onOpen(event) {
      Toast({
        context: this,
        message: `展开: ${event.detail}`,
      });
    },

    onClose(event) {
      Toast({
        context: this,
        message: `关闭: ${event.detail}`,
      });
    },
  },
});
