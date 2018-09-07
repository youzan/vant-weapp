import { create } from '../common/create';

create({
  classes: [
    'thumb-class',
    'title-class',
    'price-class',
    'desc-class',
    'num-class'
  ],

  props: {
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
