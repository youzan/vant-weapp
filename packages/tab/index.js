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
      value: '',
      observer(newVal) {
        this.setData({
          currentTab: newVal
        });
      }
    }
  },

  data: {
    currentTab: ''
  },

  attached() {
    this.setData({
      currentTab: this.data.selectedId
    });
  },

  methods: {
    _handleZanTabChange(e) {
      const selectedId = e.currentTarget.dataset.itemId;

      this.setData({
        currentTab: selectedId
      });

      console.info('[zan:tab:change] selectedId:', selectedId);
      this.triggerEvent('tabchange', selectedId);
    }
  }
})
