import { VantComponent } from '../common/component';

VantComponent({
  classes: [
    'thumb-class',
    'title-class',
    'price-class',
    'desc-class',
    'num-class'
  ],

  props: {
    tag: String,
    num: String,
    desc: String,
    thumb: String,
    title: String,
    price: String,
    centered: Boolean,
    currency: {
      type: String,
      value: '¥'
    }
  }
});
