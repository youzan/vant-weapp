import { VantComponent } from '../common/component';

VantComponent({
  relation: {
    name: 'collapse-item',
    type: 'descendant',
    linked(child) {
      this.children.push(child);
    },
    unlinked(child) {
      this.children = this.children.filter(
        (item: WechatMiniprogram.Component.TrivialInstance) => item !== child
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
      this.children.forEach((child: WechatMiniprogram.Component.TrivialInstance) => {
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
