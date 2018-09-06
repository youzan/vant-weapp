import { create } from '../utils/create';

create({
  externalClasses: [
    'custom-class',
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
      default: '¥'
    }
  }
});
