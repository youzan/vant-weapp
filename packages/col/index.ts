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
});
