const transitionBehaviors = require('../behaviors/transition');

Component({
  options: {
    addGlobalClass: true
  },

  externalClasses: ['custom-class'],

  behaviors: [transitionBehaviors],

  properties: {
    name: {
      type: String,
      value: 'fade'
    }
  }
});
