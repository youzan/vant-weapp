import { VantComponent } from '../common/component';

VantComponent({
  props: {
    title: String,
    border: {
      type: Boolean,
      value: true,
    },
    inset: {
      type: Boolean,
      value: false,
    },
  },
});
