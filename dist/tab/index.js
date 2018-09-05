const TABS_PATH = '../tabs/index';

Component({
  options: {
    addGlobalClass: true
  },

  properties: {
    disabled: Boolean,
    title: {
      type: String,
      observer() {
        const parent = this.getRelationNodes(TABS_PATH)[0];
        if (parent) {
          parent.setLine();
        }
      }
    }
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
