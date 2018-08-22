const BADGE_PATH = '../badge/index';

Component({
  options: {
    addGlobalClass: true
  },

  externalClasses: ['custom-class'],

  relations: {
    [BADGE_PATH]: {
      type: 'descendant',

      linked(target) {
        this.data.badges.push(target);
        this.setActive();
      },

      unlinked(target) {
        this.data.badges = this.data.badges.filter(item => item !== target);
        this.setActive();
      }
    }
  },

  properties: {
    active: {
      type: Number,
      value: 0,
      observer() {
        this.setActive();
      }
    }
  },

  data: {
    badges: []
  },

  attached() {
    this.currentActive = -1;
  },

  methods: {
    setActive(badge) {
      let { active } = this.data;
      if (badge) {
        active = this.data.badges.indexOf(badge);
      }

      if (active === this.currentActive) {
        return;
      }

      if (this.currentActive !== -1) {
        this.triggerEvent('change', active);
      }

      this.currentActive = active;
      this.data.badges.forEach((badge, index) => {
        badge.setActive(index === active);
      });
    }
  }
});
