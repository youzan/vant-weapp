'use strict';

Component({
  properties: {
    show: Boolean,
    title: String,
    cancelText: String,
    actions: {
      type: Array,
      value: []
    },
    overlay: {
      type: Boolean,
      value: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    onSelect: function onSelect(event) {
      var index = event.currentTarget.dataset.index;

      var item = this.data.actions[index];
      if (item && !item.disabled && !item.loading) {
        this.triggerEvent('select', item);
      }
    },
    onCancel: function onCancel() {
      this.triggerEvent('cancel');
    },
    onClose: function onClose() {
      this.triggerEvent('close');
    }
  }
});