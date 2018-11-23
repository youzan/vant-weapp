import { VantComponent } from '../common/component';
import { RED, BLUE, GREEN } from '../common/color';

const DEFAULT_COLOR = '#999';
const COLOR_MAP = {
  danger: RED,
  primary: BLUE,
  success: GREEN
};

VantComponent({
  props: {
    size: String,
    type: String,
    mark: Boolean,
    color: String,
    plain: Boolean,
    round: Boolean
  },

  computed: {
    classes() {
      const { data } = this;
      return this.classNames('van-tag', 'custom-class', {
        'van-tag--mark': data.mark,
        'van-tag--plain': data.plain,
        'van-tag--round': data.round,
        [`van-tag--${data.size}`]: data.size,
        'van-hairline--surround': data.plain
      });
    },

    style() {
      const color = this.data.color || COLOR_MAP[this.data.type] || DEFAULT_COLOR;
      const key = this.data.plain ? 'color' : 'background-color';
      return `${key}: ${color}`;
    }
  }
});
