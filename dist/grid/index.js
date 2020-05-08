import { VantComponent } from '../common/component';
import { addUnit } from '../common/utils';
VantComponent({
  relation: {
    name: 'grid-item',
    type: 'descendant',
    current: 'grid',
  },
  props: {
    square: {
      type: Boolean,
      observer: 'updateChildren',
    },
    gutter: {
      type: [Number, String],
      value: 0,
      observer: 'updateChildren',
    },
    clickable: {
      type: Boolean,
      observer: 'updateChildren',
    },
    columnNum: {
      type: Number,
      value: 4,
      observer: 'updateChildren',
    },
    center: {
      type: Boolean,
      value: true,
      observer: 'updateChildren',
    },
    border: {
      type: Boolean,
      value: true,
      observer: 'updateChildren',
    },
  },
  data: {
    viewStyle: '',
  },
  created() {
    const { gutter } = this.data;
    if (gutter) {
      this.setData({
        viewStyle: `padding-left: ${addUnit(gutter)}`,
      });
    }
  },
  methods: {
    updateChildren() {
      this.children.forEach((child) => {
        child.updateStyle();
      });
    },
  },
});
