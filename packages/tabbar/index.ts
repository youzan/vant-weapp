import { VantComponent } from '../common/component';
import { iphonex } from '../mixins/iphonex';

VantComponent({
  mixins: [iphonex],

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
        item.setActive({
          active: index === this.data.currentActive,
          color: this.data.activeColor
        });
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
