import { VantComponent } from '../common/component';
import { useParent } from '../common/relation';
import { link } from '../mixins/link';
VantComponent({
  relation: useParent('grid'),
  classes: ['content-class', 'icon-class', 'text-class'],
  mixins: [link],
  props: {
    icon: String,
    iconColor: String,
    iconPrefix: String,
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
        reverse,
        iconSize,
      } = data;
      this.setData({
        center,
        border,
        square,
        gutter,
        clickable,
        direction,
        reverse,
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
