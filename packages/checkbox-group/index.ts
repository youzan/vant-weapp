import { VantComponent } from '../common/component';

type TrivialInstance = WechatMiniprogram.Component.TrivialInstance;

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
        (child: TrivialInstance) => child !== target
      );
    }
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
