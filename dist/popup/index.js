import transitionBehaviors from '../behaviors/transition';

Component({
  options: {
    addGlobalClass: true
  },

  externalClasses: [
    'custom-class',
    'overlay-class'
  ],

  behaviors: [transitionBehaviors],

  properties: {
    overlayStyle: String,
    show: {
      value: false,
      type: Boolean,
      observer(value) {
        if (value) {
          this.show();
        } else {
          this.setData({
            type: 'leave'
          });
        }
      }
    },
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
