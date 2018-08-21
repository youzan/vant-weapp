Component({
  options: {
    addGlobalClass: true
  },

  externalClasses: [
    'custom-class',
    'overlay-class'
  ],

  properties: {
    show: Boolean,
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
