'use strict';

Component({
  externalClasses: ['custom-class', 'theme-class'],

  properties: {
    type: {
      type: String
    },
    plain: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    }
  }
});