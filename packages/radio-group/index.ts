import { VantComponent } from '../common/component';
import { useChildren } from '../common/relation';

VantComponent({
  field: true,

  relation: useChildren('radio'),

  props: {
    value: {
      type: null,
      observer: 'updateChildren',
    },
    direction: String,
    disabled: {
      type: Boolean,
      observer: 'updateChildren',
    },
  },

  methods: {
    updateChildren() {
      this.children.forEach((child) => child.updateFromParent());
    },
  },
});
