import { link } from '../mixins/link';
import { VantComponent } from '../common/component';
VantComponent({
  relation: {
    name: 'grid',
    type: 'ancestor',
    current: 'grid-item',
  },
  classes: ['content-class', 'icon-class', 'text-class'],
  mixins: [link],
  props: {
    icon: String,
    iconColor: String,
    dot: Boolean,
    info: null,
    badge: null,
    text: String,
    useSlot: Boolean,
  },
  data: {
    viewStyle: '',
  },
  mounted() {
    this.updateStyle();
  },
  methods: {
    updateStyle() {
      if (!this.parent) {
        return;
      }
      const { data, children } = this.parent;
      const {
        columnNum,
        border,
        square,
        gutter,
        clickable,
        center,
        direction,
        iconSize,
      } = data;
      this.setData({
        center,
        border,
        square,
        gutter,
        clickable,
        direction,
        iconSize,
        index: children.indexOf(this),
        columnNum,
      });
    },
    onClick() {
      this.$emit('click');
      this.jumpLink();
    },
  },
});
