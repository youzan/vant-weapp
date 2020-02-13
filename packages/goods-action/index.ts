import { VantComponent } from '../common/component';

VantComponent({
  simpleRelation: {
    type: 'descendant',
    name: 'goods-action-button',
    current: 'goods-action',
  },
  props: {
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  }
});
