import transitionBehaviors from '../behaviors/transition';

Component({
  options: {
    addGlobalClass: true
  },

  externalClasses: ['custom-class'],

  behaviors: [transitionBehaviors(false)],

  properties: {
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
