import { VantComponent } from '../common/component';
const PRESETS = ['error', 'search', 'default', 'network'];
VantComponent({
  props: {
    description: String,
    image: {
      type: String,
      value: 'default',
    },
  },
  created() {
    if (PRESETS.indexOf(this.data.image) !== -1) {
      this.setData({
        imageUrl: `https://img.yzcdn.cn/vant/empty-image-${this.data.image}.png`,
      });
    } else {
      this.setData({ imageUrl: this.data.image });
    }
  },
});
