const TABS_PATH = '../tabs/index';

Component({
  options: {
    addGlobalClass: true
  },

  properties: {
    title: {
      type: String,
      observer() {
        const parent = this.getRelationNodes(TABS_PATH)[0];
        if (parent) {
          parent.setLine();
        }
      }
    },
    disabled: Boolean
  },

  relations: {
    [TABS_PATH]: {
      type: 'ancestor'
    }
  },

  data: {
    inited: false,
    active: false
  }
});
