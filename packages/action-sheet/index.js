Component({
  options: {
    addGlobalClass: true
  },

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
    onSelect(event) {
      const { index } = event.currentTarget.dataset;
      const item = this.data.actions[index];
      if (item && !item.disabled && !item.loading) {
        this.triggerEvent('select', item);
      }
    },

    onCancel() {
      this.triggerEvent('cancel');
    },

    onClose() {
      this.triggerEvent('close');
    }
  }
});
