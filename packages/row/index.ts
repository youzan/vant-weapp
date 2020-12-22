import { VantComponent } from '../common/component';

VantComponent({
  relation: {
    name: 'col',
    type: 'descendant',
    current: 'row',
    linked(target) {
      const { gutter } = this.data;

      if (gutter) {
        target.setData({ gutter });
      }
    },
  },

  props: {
    gutter: {
      type: Number,
      observer: 'setGutter',
    },
  },

  methods: {
    setGutter() {
      this.getRelationNodes('../col/index').forEach((col) => {
        col.setData(this.data.gutter);
      });
    },
  },
});
