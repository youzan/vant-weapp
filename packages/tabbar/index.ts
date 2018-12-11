import { VantComponent } from '../common/component';
import { iphonex } from '../mixins/iphonex';

VantComponent({
  relation: {
    name: 'tabbar-item',
    type: 'descendant',
    linked(target: Weapp.Component) {
      this.data.items.push(target);
      setTimeout(() => {
        this.setActiveItem();
      });
    },
    unlinked(target: Weapp.Component) {
      this.data.items = this.data.items.filter(item => item !== target);
      setTimeout(() => {
        this.setActiveItem();
      });
    }
  },

  mixins: [iphonex],

  props: {
    active: Number,
    fixed: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 1
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  },

  data: {
    items: [],
    currentActive: -1
  },

  computed: {
    tabbarClass() {
      const { fixed, isIPhoneX, safeAreaInsetBottom } = this.data;
      return this.classNames('custom-class', 'van-tabbar', 'van-hairline--top-bottom', {
        'van-tabbar--fixed': fixed,
        'van-tabbar--safe': isIPhoneX && safeAreaInsetBottom
      });
    }
  },

  watch: {
    active(active) {
      this.set({ currentActive: active });
      this.setActiveItem();
    }
  },

  created() {
    this.set({ currentActive: this.data.active });
  },

  methods: {
    setActiveItem() {
      this.data.items.forEach((item, index) => {
        item.setActive(index === this.data.currentActive);
      });
    },

    onChange(child) {
      const active = this.data.items.indexOf(child);
      if (active !== this.data.currentActive && active !== -1) {
        this.$emit('change', active);
        this.set({ currentActive: active });
        this.setActiveItem();
      }
    }
  }
});
