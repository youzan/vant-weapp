import { create } from '../common/create';
import { transition } from '../mixins/transition';

create({
  mixins: [transition(true)],

  props: {
    name: {
      type: String,
      value: 'fade'
    }
  }
});
