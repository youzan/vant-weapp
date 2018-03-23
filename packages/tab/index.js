Component({
  externalClasses: 'class',

  properties: {
    tab: {
      type: Object,
      value: {},
      observer(newVal, oldVal) {
        if (newVal.selectedId && newVal.selectedId !== oldVal.selectedId) {
          this.setData({
            currentTab: newVal.selectedId
          });
        }
      }
    },
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
    },
    componentId: {
      type: String,
      default: ''
    }
  },

  data: {
    currentTab: ''
  },

  attached() {
    const { tab, selectedId } = this.data;
    this.setData({
      currentTab: tab.selectedId || selectedId
    });
  },

  methods: {
    _handleZanTabChange(e) {
      const { componentId, itemId: selectedId } = e.currentTarget.dataset;
      const data = { componentId, selectedId };

      this.setData({
        currentTab: selectedId
      });

      console.info('[zan:tab:change]', data);
      this.triggerEvent('tabchange', data);
    }
  }
})
