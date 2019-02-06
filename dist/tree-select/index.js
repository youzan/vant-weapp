import { VantComponent } from '../common/component';
var ITEM_HEIGHT = 44;
VantComponent({
  classes: ['main-item-class', 'content-item-class', 'main-active-class', 'content-active-class', 'main-disabled-class', 'content-disabled-class'],
  props: {
    items: Array,
    mainActiveIndex: {
      type: Number,
      value: 0
    },
    activeId: {
      type: [Number, String]
    },
    maxHeight: {
      type: Number,
      value: 300
    }
  },
  data: {
    subItems: [],
    mainHeight: 0,
    itemHeight: 0
  },
  watch: {
    items: function items() {
      var _this = this;

      this.updateSubItems().then(function () {
        _this.updateMainHeight();
      });
    },
    maxHeight: function maxHeight() {
      this.updateItemHeight(this.data.subItems);
      this.updateMainHeight();
    },
    mainActiveIndex: 'updateSubItems'
  },
  methods: {
    // 当一个子项被选择时
    onSelectItem: function onSelectItem(event) {
      var item = event.currentTarget.dataset.item;

      if (!item.disabled) {
        this.$emit('click-item', item);
      }
    },
    // 当一个导航被点击时
    onClickNav: function onClickNav(event) {
      var index = event.currentTarget.dataset.index;
      var item = this.data.items[index];

      if (!item.disabled) {
        this.$emit('click-nav', {
          index: index
        });
      }
    },
    // 更新子项列表
    updateSubItems: function updateSubItems() {
      var _this$data = this.data,
          items = _this$data.items,
          mainActiveIndex = _this$data.mainActiveIndex;

      var _ref = items[mainActiveIndex] || {},
          _ref$children = _ref.children,
          children = _ref$children === void 0 ? [] : _ref$children;

      this.updateItemHeight(children);
      return this.set({
        subItems: children
      });
    },
    // 更新组件整体高度，根据最大高度和当前组件需要展示的高度来决定
    updateMainHeight: function updateMainHeight() {
      var _this$data2 = this.data,
          _this$data2$items = _this$data2.items,
          items = _this$data2$items === void 0 ? [] : _this$data2$items,
          _this$data2$subItems = _this$data2.subItems,
          subItems = _this$data2$subItems === void 0 ? [] : _this$data2$subItems;
      var maxHeight = Math.max(items.length * ITEM_HEIGHT, subItems.length * ITEM_HEIGHT);
      this.set({
        mainHeight: Math.min(maxHeight, this.data.maxHeight)
      });
    },
    // 更新子项列表高度，根据可展示的最大高度和当前子项列表的高度决定
    updateItemHeight: function updateItemHeight(subItems) {
      var itemHeight = Math.min(subItems.length * ITEM_HEIGHT, this.data.maxHeight);
      return this.set({
        itemHeight: itemHeight
      });
    }
  }
});