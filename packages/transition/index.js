import transitionBehaviors from '../behaviors/transition';

Component({
  options: {
    addGlobalClass: true
  },

  externalClasses: ['custom-class'],

  behaviors: [transitionBehaviors(true)],

  properties: {
    name: {
      type: String,
      value: 'fade'
    }
  }
});
