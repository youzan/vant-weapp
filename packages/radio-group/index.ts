import { VantComponent } from '../common/component';

VantComponent({
  field: true,

  relation: {
    name: 'radio',
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
    value: {
      type: null,
      observer: 'updateChildren'
    },
    disabled: {
      type: Boolean,
      observer: 'updateChildren'
    }
  },

  methods: {
    updateChildren() {
      (this.children || []).forEach((child: WechatMiniprogram.Component.TrivialInstance) =>
        this.updateChild(child)
      );
    },

    updateChild(child: WechatMiniprogram.Component.TrivialInstance) {
      const { value, disabled } = this.data;
      child.setData({
        value,
        disabled: disabled || child.data.disabled
      });
    }
  }
});
