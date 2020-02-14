import { VantComponent } from '../common/component';

VantComponent({
  props: {
    color: String,
    vertical: Boolean,
    type: {
      type: String,
      value: 'circular'
    },
    size: String,
    textSize: String
  },
  data: {
    array12: Array.from({ length: 12 }),
    // hack baidu
    style: 'font-size: 0; line-height: 1;',
  }
});
