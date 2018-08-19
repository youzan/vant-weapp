const TABBAR_PATH = '../tabbar/index';

Component({
  name: 'tabbar-item',

  properties: {
    info: null,
    icon: String,
    dot: Boolean
  },

  options: {
    multipleSlots: true
  },

  relations: {
    [TABBAR_PATH]: {
      type: 'ancestor'
    }
  },

  data: {
    active: false,
    count: 0
  },

  methods: {
    onClick() {
      const parent = this.getRelationNodes(TABBAR_PATH)[0];
      if (parent) {
        parent.onChange(this);
      }
      this.triggerEvent('click');
    }
  }
});
