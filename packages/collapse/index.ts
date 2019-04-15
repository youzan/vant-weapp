import { VantComponent } from '../common/component';

VantComponent({
  relation: {
    name: 'collapse-item',
    type: 'descendant',
    linked(child: Weapp.Component) {
      this.children.push(child);
    },
    unlinked(child: Weapp.Component) {
      this.children = this.children.filter(
        (item: Weapp.Component) => item !== child
      );
    }
  },

  props: {
    value: {
      type: null,
      observer: 'updateExpanded'
    },
    accordion: {
      type: Boolean,
      observer: 'updateExpanded'
    },
    border: {
      type: Boolean,
      value: true
    }
  },

  beforeCreate() {
    this.children = [];
  },

  methods: {
    updateExpanded() {
      this.children.forEach((child: Weapp.Component) => {
        child.updateExpanded();
      });
    },

    switch(name: string | number, expanded: boolean) {
      const { accordion, value } = this.data;
      if (!accordion) {
        name = expanded
          ? (value || []).concat(name)
          : (value || []).filter(
            (activeName: string | number) => activeName !== name
          );
      } else {
        name = expanded ? name : '';
      }
      this.$emit('change', name);
      this.$emit('input', name);
    }
  }
});
