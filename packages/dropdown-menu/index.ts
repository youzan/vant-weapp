import { VantComponent } from '../common/component';

VantComponent({
  field: true,

  relation: {
    name: 'checkbox',
    type: 'descendant',
    linked(target) {
      this.children = this.children || [];
      this.children.push(target);
      this.updateChild(target);
    },
    unlinked(target) {
      this.children = this.children.filter(
        (child: WechatMiniprogram.Component.TrivialInstance) => child !== target
      );
    }
  },

  props: {
    activeColor: String,
    overlay: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 10
    },
    duration: {
      type: Number,
      value: 0.2
    },
    direction: {
      type: String,
      value: 'down'
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true
    }
  },

  data: {
    offset: 0
  },

  methods: {
    updateChildren() {
      (this.children || []).forEach(
        (child: WechatMiniprogram.Component.TrivialInstance) =>
          this.updateChild(child)
      );
    },

    updateChild(child: WechatMiniprogram.Component.TrivialInstance) {
      const { value, disabled } = this.data;
      child.setData({
        value: value.indexOf(child.data.name) !== -1,
        disabled: disabled || child.data.disabled
      });
    }
  }
});
