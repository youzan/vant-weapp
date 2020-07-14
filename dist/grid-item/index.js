import { link } from '../mixins/link';
import { VantComponent } from '../common/component';
import { addUnit } from '../common/utils';
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
      const width = `${100 / columnNum}%`;
      const styleWrapper = [];
      styleWrapper.push(`width: ${width}`);
      if (square) {
        styleWrapper.push(`padding-top: ${width}`);
      }
      if (gutter) {
        const gutterValue = addUnit(gutter);
        styleWrapper.push(`padding-right: ${gutterValue}`);
        const index = children.indexOf(this);
        if (index >= columnNum && !square) {
          styleWrapper.push(`margin-top: ${gutterValue}`);
        }
      }
      let contentStyle = '';
      if (square && gutter) {
        const gutterValue = addUnit(gutter);
        contentStyle = `
          right: ${gutterValue};
          bottom: ${gutterValue};
          height: auto;
        `;
      }
      this.setData({
        viewStyle: styleWrapper.join('; '),
        contentStyle,
        center,
        border,
        square,
        gutter,
        clickable,
        direction,
        iconSize,
      });
    },
    onClick() {
      this.$emit('click');
      this.jumpLink();
    },
  },
});
