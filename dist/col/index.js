import { VantComponent } from '../common/component';
VantComponent({
  relation: {
    name: 'row',
    type: 'ancestor',
    current: 'col',
  },
  props: {
    span: Number,
    offset: Number,
  },
  data: {
    viewStyle: '',
  },
  methods: {
    setGutter(gutter) {
      const padding = `${gutter / 2}px`;
      const viewStyle = gutter
        ? `padding-left: ${padding}; padding-right: ${padding};`
        : '';
      if (viewStyle !== this.data.viewStyle) {
        this.setData({ viewStyle });
      }
    },
  },
});
