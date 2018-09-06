import { create } from '../utils/create';
import transitionBehaviors from '../behaviors/transition';

create({
  externalClasses: ['custom-class'],

  mixins: [transitionBehaviors(false)],

  props: {
    overlayStyle: String,
    overlay: {
      type: Boolean,
      value: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true
    },
    position: {
      type: String,
      value: 'center'
    }
  },

  methods: {
    onClickOverlay() {
      this.triggerEvent('click-overlay');

      if (this.data.closeOnClickOverlay) {
        this.triggerEvent('close');
      }
    }
  }
});
