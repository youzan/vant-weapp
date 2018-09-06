import { create } from '../utils/create';
import transitionBehaviors from '../behaviors/transition';

create({
  externalClasses: ['custom-class'],

  mixins: [transitionBehaviors(true)],

  props: {
    name: {
      type: String,
      value: 'fade'
    }
  }
});
