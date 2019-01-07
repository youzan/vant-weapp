import { VantComponent } from '../common/component';
import { iphonex } from '../mixins/iphonex';
VantComponent({
  mixins: [iphonex],
  relation: {
    name: 'tabbar-item',
    type: 'descendant',
    linked: function linked(target) {
      var _this = this;

      this.data.items.push(target);
      setTimeout(function () {
        _this.setActiveItem();
      });
    },
    unlinked: function unlinked(target) {
      var _this2 = this;

      this.data.items = this.data.items.filter(function (item) {
        return item !== target;
      });
      setTimeout(function () {
        _this2.setActiveItem();
      });
    }
  },
  props: {
    active: Number,
    activeColor: String,
    fixed: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 1
    }
  },
  data: {
    items: [],
    currentActive: -1
  },
  watch: {
    active: function active(_active) {
      this.set({
        currentActive: _active
      });
      this.setActiveItem();
    }
  },
  created: function created() {
    this.set({
      currentActive: this.data.active
    });
  },
  methods: {
    setActiveItem: function setActiveItem() {
      var _this3 = this;

      this.data.items.forEach(function (item, index) {
        item.setActive({
          active: index === _this3.data.currentActive,
          color: _this3.data.activeColor
        });
      });
    },
    onChange: function onChange(child) {
      var active = this.data.items.indexOf(child);

      if (active !== this.data.currentActive && active !== -1) {
        this.$emit('change', active);
        this.set({
          currentActive: active
        });
        this.setActiveItem();
      }
    }
  }
});