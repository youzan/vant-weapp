import { create } from '../utils/create';

create({
  externalClasses: [
    'custom-class',
    'footer-class'
  ],

  props: {
    desc: String,
    title: String,
    status: String,
    headerClass: String,
    useFooterSlot: Boolean
  }
});
