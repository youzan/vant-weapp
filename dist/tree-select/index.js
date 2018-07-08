'use strict';

var ITEM_HEIGHT = 44;

Component({
  properties: {
    items: {
      type: Array,
      observer: function observer() {
        this.updateSubItems();
        this.updateMainHeight();
      }
    },
    mainActiveIndex: {
      type: Number,
      value: 0,
      observer: function observer() {
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
      observer: function observer() {
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
    // 当一个子项被选择时
    onItemSelect: function onItemSelect(_ref) {
      var _ref$currentTarget = _ref.currentTarget,
          currentTarget = _ref$currentTarget === undefined ? {} : _ref$currentTarget;
      var _currentTarget$datase = currentTarget.dataset,
          data = _currentTarget$datase === undefined ? {} : _currentTarget$datase;

      this.triggerEvent('itemclick', Object.assign({}, data.item || {}));
    },


    // 当一个导航被点击时
    handleNavClick: function handleNavClick(_ref2) {
      var _ref2$currentTarget = _ref2.currentTarget,
          currentTarget = _ref2$currentTarget === undefined ? {} : _ref2$currentTarget;
      var _currentTarget$datase2 = currentTarget.dataset,
          data = _currentTarget$datase2 === undefined ? {} : _currentTarget$datase2;

      this.triggerEvent('navclick', { index: data.index });
    },


    // 更新子项列表
    updateSubItems: function updateSubItems() {
      var selectedItem = this.data.items[this.data.mainActiveIndex] || {};

      this.setData({ subItems: selectedItem.children || [] });

      this.updateItemHeight();
    },


    // 更新组件整体高度，根据最大高度和当前组件需要展示的高度来决定
    updateMainHeight: function updateMainHeight() {
      var maxHeight = Math.max(this.data.items.length * ITEM_HEIGHT, this.data.subItems.length * ITEM_HEIGHT);

      this.setData({ mainHeight: Math.min(maxHeight, this.data.maxHeight) });
    },


    // 更新子项列表高度，根据可展示的最大高度和当前子项列表的高度决定
    updateItemHeight: function updateItemHeight() {
      this.setData({ itemHeight: Math.min(this.data.subItems.length * ITEM_HEIGHT, this.data.maxHeight) });
    }
  }
});