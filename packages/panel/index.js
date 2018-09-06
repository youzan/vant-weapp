import { create } from '../utils/create';

create({
  classes: ['footer-class'],

  props: {
    desc: String,
    title: String,
    status: String,
    headerClass: String,
    useFooterSlot: Boolean
  }
});
