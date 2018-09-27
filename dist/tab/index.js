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
    disabled: function disabled() {
      var parent = this.getRelationNodes('../tabs/index')[0];

      if (parent) {
        parent.updateTabs();
      }
    },
    title: function title() {
      var parent = this.getRelationNodes('../tabs/index')[0];

      if (parent) {
        parent.setLine();
        parent.updateTabs();
      }
    }
  }
});