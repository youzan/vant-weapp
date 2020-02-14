import { VantComponent } from '../common/component';

type TrivialInstance = WechatMiniprogram.Component.TrivialInstance;

VantComponent({
  field: true,

  relation: {
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
      (this.children || []).forEach((child: TrivialInstance) =>
        this.updateChild(child)
      );
    },

    updateChild(child: TrivialInstance) {
      const { value, disabled } = this.data;
      child.setData({
        value: value.indexOf(child.data.name) !== -1,
        parentDisabled: disabled
      });
    }
  }
});
