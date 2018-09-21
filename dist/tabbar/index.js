import { VantComponent } from '../common/component';

VantComponent({
  props: {
    active: {
      type: Number,
      observer(active) {
        this.setData({ currentActive: active });
        this.setActiveItem();
      }
    },
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

  created() {
    this.setData({ currentActive: this.data.active });
  },

  relations: {
    '../tabbar-item/index': {
      type: 'descendant',

      linked(target) {
        this.data.items.push(target);
        setTimeout(() => {
          this.setActiveItem();
        });
      },

      unlinked(target) {
        this.data.items = this.data.items.filter(item => item !== target);
        setTimeout(() => {
          this.setActiveItem();
        });
      }
    }
  },

  methods: {
    setActiveItem() {
      this.data.items.forEach((item, index) => {
        item.setActive({
          active: index === this.data.currentActive,
          count: this.data.items.length
        });
      });
    },

    onChange(child) {
      const active = this.data.items.indexOf(child);
      if (active !== this.data.currentActive && active !== -1) {
        this.$emit('change', active);
        this.setData({ currentActive: active });
        this.setActiveItem();
      }
    }
  }
});
