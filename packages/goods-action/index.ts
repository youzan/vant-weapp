import { VantComponent } from '../common/component';
import { iphonex } from '../mixins/iphonex';

VantComponent({
  mixins: [iphonex],

  props: {
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  }
});
