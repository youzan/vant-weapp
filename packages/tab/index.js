import { create } from '../common/create';

create({
  props: {
    disabled: Boolean,
    title: {
      type: String,
      observer() {
        const parent = this.getRelationNodes('../tabs/index')[0];
        if (parent) {
          parent.setLine();
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
