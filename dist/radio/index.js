'use strict';

Component({
  behaviors: ['wx://form-field'],

  externalClasses: ['radio-class', 'radio-color'],

  properties: {
    items: Array,
    type: String
  },

  methods: {
    radioChange: function radioChange(e) {
      this.selectItem(e.detail.value);
      this.triggerEvent('change', e);
    },
    selectItem: function selectItem(value) {
      var items = this.data.items;


      items.forEach(function (item) {
        if (item.name === value) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      });

      this.setData({ items: items });
    }
  }
});