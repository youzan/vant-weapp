import { VantComponent } from '../common/component';

VantComponent({
  field: true,

  relation: {
    name: 'radio',
    type: 'descendant',
    current: 'radio-group',
    linked(target) {
      this.updateChild(target);
    },
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
