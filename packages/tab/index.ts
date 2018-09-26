import { VantComponent } from '../common/component';

VantComponent({
  relation: {
    name: 'tabs',
    type: 'ancestor'
  },

  props: {
    title: String,
    disabled: Boolean
  },

  data: {
    inited: false,
    active: false
  },

  watch: {
    disabled() {
      const parent = this.getRelationNodes('../tabs/index')[0];
      if (parent) {
        parent.updateTabs();
      }
    },

    title() {
      const parent = this.getRelationNodes('../tabs/index')[0];
      if (parent) {
        parent.setLine();
        parent.updateTabs();
      }
    }
  }
});
