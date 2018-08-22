Component({
  options: {
    addGlobalClass: true
  },

  externalClasses: ['custom-class'],

  properties: {
    size: {
      type: String,
      value: '30px'
    },
    type: {
      type: String,
      value: 'circular'
    },
    color: {
      type: String,
      value: '#c9c9c9'
    }
  }
});
