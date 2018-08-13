'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
    onSelectItem: function onSelectItem(event) {
      var _ref = event.currentTarget || {},
          _ref$dataset = _ref.dataset,
          dataset = _ref$dataset === undefined ? {} : _ref$dataset;

      this.triggerEvent('click-item', _extends({}, dataset.item || {}));
    },


    // 当一个导航被点击时
    onClickNav: function onClickNav(event) {
      var _ref2 = event.currentTarget || {},
          _ref2$dataset = _ref2.dataset,
          dataset = _ref2$dataset === undefined ? {} : _ref2$dataset;

      this.triggerEvent('click-nav', { index: dataset.index });
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