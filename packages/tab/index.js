import { VantComponent } from '../common/component';

VantComponent({
  props: {
    disabled: {
      type: Boolean,
      observer() {
        const parent = this.getRelationNodes('../tabs/index')[0];
        if (parent) {
          parent.updateTabs();
        }
      }
    },
    title: {
      type: String,
      observer() {
        const parent = this.getRelationNodes('../tabs/index')[0];
        if (parent) {
          parent.setLine();
          parent.updateTabs();
        }
      }
    }
  },

  relations: {
    '../tabs/index': {
      type: 'ancestor'
    }
  },

  data: {
    inited: false,
    active: false
  }
});
