'use strict';

Component({
  externalClasses: 'class',

  properties: {
    scroll: {
      type: Boolean,
      value: false
    },
    fixed: {
      type: Boolean,
      value: false
    },
    height: {
      type: Number,
      value: 0
    },
    list: {
      type: Array,
      value: []
    },
    selectedId: {
      type: [String, Number],
      value: ''
    }
  },

  methods: {
    _handleZanTabChange: function _handleZanTabChange(e) {
      var selectedId = e.currentTarget.dataset.itemId;

      this.setData({
        selectedId: selectedId
      });

      this.triggerEvent('tabchange', selectedId);
    }
  }
});