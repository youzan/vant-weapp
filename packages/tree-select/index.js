Component({
  properties: {
    items: {
      type: Array,
      observer() {
        this.updateSubItems();
        this.updateMainHeight();
      }
    },
    mainActiveIndex: {
      type: Number,
      value: 0,
      observer() {
        this.updateSubItems();
      }
    },
    activeId: {
      type: Number,
      value: 0
    },
    maxHeight: {
      type: Number,
      value: 300,
      observer() {
        this.updateItemHeight();
        this.updateMainHeight();
      }
    }
  },

  data: {
    subItems: [],
    mainHeight: 0,
    itemHeight: 0
  },

  methods: {
    onItemSelect({ currentTarget = {} }) {
      const { dataset: data = {} } = currentTarget;
      this.triggerEvent('itemclick', { ...(data.item || {}) });
    },

    handleNavClick({ currentTarget = {} }) {
      const { dataset: data = {} } = currentTarget;
      this.triggerEvent('navclick', { index: data.index });
    },

    updateSubItems() {
      const selectedItem = this.data.items[this.data.mainActiveIndex] || {};

      this.setData({ subItems: selectedItem.children || [] });

      this.updateItemHeight();
    },

    updateMainHeight() {
      const maxHeight = Math.max(this.data.items.length * 44, this.data.subItems.length * 44);

      this.setData({ mainHeight: Math.min(maxHeight, this.data.maxHeight) })
    },

    updateItemHeight() {
      this.setData({ itemHeight: Math.min(this.data.subItems.length * 44, this.data.maxHeight) });
    }
  }
});
