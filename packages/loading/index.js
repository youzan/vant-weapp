import { create } from '../utils/create';

create({
  externalClasses: ['custom-class'],

  props: {
    size: {
      type: String,
      value: '30px'
    },
    type: {
      type: String,
      value: 'circular'
    },
    color: {
      type: String,
      value: '#c9c9c9'
    }
  }
});
