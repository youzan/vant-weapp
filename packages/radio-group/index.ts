import { VantComponent } from '../common/component';

VantComponent({
  field: true,

  relation: {
    name: 'radio',
    type: 'descendant',
    linked(target: Weapp.Component) {
      this.children = this.children || [];
      this.children.push(target);
      this.updateChild(target);
    },
    unlinked(target: Weapp.Component) {
      this.children = this.children.filter(
        (child: Weapp.Component) => child !== target
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
      (this.children || []).forEach((child: Weapp.Component) =>
        this.updateChild(child)
      );
    },

    updateChild(child: Weapp.Component) {
      const { value, disabled } = this.data;
      child.set({
        value,
        disabled: disabled || child.data.disabled
      });
    }
  }
});
