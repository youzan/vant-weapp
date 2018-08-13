'use strict';

Component({
  externalClasses: ['custom-class', 'node-class'],

  properties: {
    checked: Boolean,
    loading: Boolean,
    disabled: Boolean,
    size: {
      type: String,
      value: '30px'
    }
  },

  methods: {
    onClick: function onClick() {
      if (!this.data.disabled && !this.data.loading) {
        var checked = !this.data.checked;
        this.triggerEvent('input', checked);
        this.triggerEvent('change', checked);
      }
    }
  }
});