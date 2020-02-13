import { VantComponent } from '../common/component';

VantComponent({
  field: true,

  simpleRelation: {
    name: 'checkbox',
    type: 'descendant',
    current: 'checkbox-group',
    linked(target) {
      this.updateChild(target);
    },
  },

  props: {
    max: Number,
    value: {
      type: Array,
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
        value: value.indexOf(child.data.name) !== -1,
        disabled: disabled || child.data.disabled
      });
    }
  }
});
