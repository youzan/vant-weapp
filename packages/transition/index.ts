import { VantComponent } from '../common/component';
import { transition } from '../mixins/transition';

VantComponent({
  classes: [
    'enter-class',
    'enter-active-class',
    'enter-to-class',
    'leave-class',
    'leave-active-class',
    'leave-to-class',
  ],

  mixins: [transition(true)],

  props: {
    lockScroll: {
      type: Boolean,
      value: false,
    },
  },

  methods: {
    // for prevent touchmove
    noop() {},
  },
});
