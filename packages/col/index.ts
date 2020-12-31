import { useParent } from '../common/relation';
import { VantComponent } from '../common/component';

VantComponent({
  relation: useParent('row'),

  props: {
    span: Number,
    offset: Number,
  },
});
