import { create } from '../utils/create';

create({
  externalClasses: ['custom-class'],

  props: {
    border: {
      type: Boolean,
      value: true
    }
  }
});
