import { VantComponent } from '../common/component';
VantComponent({
  relation: {
    name: 'col',
    type: 'descendant',
    current: 'row',
    linked(target) {
      if (this.data.gutter) {
        target.setGutter(this.data.gutter);
      }
    },
  },
  props: {
    gutter: {
      type: Number,
      observer: 'setGutter',
    },
  },
  data: {
    viewStyle: '',
  },
  mounted() {
    if (this.data.gutter) {
      this.setGutter();
    }
  },
  methods: {
    setGutter() {
      const { gutter } = this.data;
      const margin = `-${Number(gutter) / 2}px`;
      const viewStyle = gutter
        ? `margin-right: ${margin}; margin-left: ${margin};`
        : '';
      this.setData({ viewStyle });
      this.getRelationNodes('../col/index').forEach((col) => {
        col.setGutter(this.data.gutter);
      });
    },
  },
});
