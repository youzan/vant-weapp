import { VantComponent } from '../common/component';

type TrivialInstance = WechatMiniprogram.Component.TrivialInstance;

VantComponent({
  relation: {
    name: 'tabbar-item',
    type: 'descendant',
    current: 'tabbar',
    linked(target) {
      target.parent = this;
      target.updateFromParent();
    },
    unlinked() {
      this.updateChildren();
    }
  },

  props: {
    active: {
      type: null,
      observer: 'updateChildren'
    },
    activeColor: {
      type: String,
      observer: 'updateChildren'
    },
    inactiveColor: {
      type: String,
      observer: 'updateChildren'
    },
    fixed: {
      type: Boolean,
      value: true
    },
    border: {
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

  methods: {
    updateChildren() {
      const { children } = this;
      if (!Array.isArray(children) || !children.length) {
        return Promise.resolve();
      }

      return Promise.all(
        children.map((child: TrivialInstance) => child.updateFromParent())
      );
    },

    onChange(child: TrivialInstance) {
      const index = this.children.indexOf(child);
      const active = child.data.name || index;

      if (active !== this.data.active) {
        this.$emit('change', active);
      }
    }
  }
});
