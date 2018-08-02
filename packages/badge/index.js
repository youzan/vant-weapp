const BADGE_GROUP_PATH = '../badge-group/index';

Component({
  externalClasses: ['custom-class'],

  relations: {
    [BADGE_GROUP_PATH]: {
      type: 'ancestor'
    }
  },

  properties: {
    info: Number,
    title: String
  },

  methods: {
    onTap() {
      const group = this.getRelationNodes(BADGE_GROUP_PATH)[0];
      if (group) {
        group.setActive(this);
      }
    },

    setActive(active) {
      this.setData({ active });
    }
  }
});
