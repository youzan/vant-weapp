import { create } from '../utils/create';

create({
  externalClasses: ['custom-class'],

  props: {
    type: String,
    mark: Boolean,
    plain: Boolean
  }
});
