Component({
  options: {
    addGlobalClass: true
  },

  externalClasses: ['custom-class'],

  properties: {
    info: null,
    name: String,
    size: String,
    color: String,
    classPrefix: {
      type: String,
      value: 'van-icon'
    }
  },

  methods: {
    onClick() {
      this.triggerEvent('click');
    }
  }
});
