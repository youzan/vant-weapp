Component({
  externalClasses: ['active-tab-class'],

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

  data: {
    scrollLeft: 0
  },

  methods: {
    _handleScroll(selectedId) {
      const query = wx.createSelectorQuery().in(this);
      query.select(`#item-${selectedId}`).boundingClientRect();
      query.select('#scroll-view').boundingClientRect();
      query.select('#scroll-view').scrollOffset();
      query.exec(res => {
        this.setData({
          scrollLeft: res[2].scrollLeft + res[0].left + res[0].width / 2 - res[1].width / 2
        });
      });
    },
    _handleZanTabChange(e) {
      const selectedId = e.currentTarget.dataset.itemId;

      if (this.data.scroll) {
        this._handleScroll(selectedId);
      }

      this.setData({
        selectedId
      });

      console.info('[zan:tab:change] selectedId:', selectedId);
      this.triggerEvent('tabchange', selectedId);
    }
  }
});
