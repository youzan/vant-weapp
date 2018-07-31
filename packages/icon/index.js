Component({
  externalClasses: ['custom-class'],

  properties: {
    info: null,
    name: String,
    size: String,
    color: String
  },

  methods: {
    onTap(event) {
      this.triggerEvent('tap', event);
    }
  }
});
