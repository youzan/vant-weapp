import { VantComponent } from '../common/component';

VantComponent({
  field: true,

  relation: {
    name: 'dropdown-menu',
    type: 'ancestor',
    linked(target) {
      this.parent = target;
    },
    unlinked() {
      this.parent = null;
    }
  },

  props: {
    value: null,
    title: String,
    disabled: Boolean,
    titleClass: String,
    options: {
      type: Array,
      value: []
    }
  },

  data: {
    transition: true,
    showPopup: false,
    showWrapper: false
  }
});
