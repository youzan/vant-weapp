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
    _handleZanTabChange(e) {
      const selectedId = e.currentTarget.dataset.itemId;

      this.setData({
        selectedId
      });

      
      this.triggerEvent('tabchange', selectedId);
    }
  }
});
