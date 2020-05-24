import { VantComponent } from '../common/component';
VantComponent({
  relation: {
    name: 'collapse-item',
    type: 'descendant',
    current: 'collapse',
  },
  props: {
    value: {
      type: null,
      observer: 'updateExpanded',
    },
    accordion: {
      type: Boolean,
      observer: 'updateExpanded',
    },
    border: {
      type: Boolean,
      value: true,
    },
  },
  methods: {
    updateExpanded() {
      this.children.forEach((child) => {
        child.updateExpanded();
      });
    },
    switch(name, expanded) {
      const { accordion, value } = this.data;
      const changeItem = name;
      if (!accordion) {
        name = expanded
          ? (value || []).concat(name)
          : (value || []).filter((activeName) => activeName !== name);
      } else {
        name = expanded ? name : '';
      }
      if (expanded) {
        this.$emit('open', changeItem);
      } else {
        this.$emit('close', changeItem);
      }
      this.$emit('change', name);
      this.$emit('input', name);
    },
  },
});
