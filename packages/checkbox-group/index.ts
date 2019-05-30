import { VantComponent } from '../common/component';

VantComponent({
  field: true,

  relation: {
    name: 'checkbox',
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
      (this.children || []).forEach((child: Weapp.Component) =>
        this.updateChild(child)
      );
    },

    updateChild(child: Weapp.Component) {
      const { value, disabled } = this.data;
      child.set({
        value: value.indexOf(child.data.name) !== -1,
        disabled: disabled || child.data.disabled
      });
    }
  }
});
