'use strict';

var _relations;

var BADGE_PATH = '../badge/index';

Component({
  externalClasses: ['custom-class'],

  relations: (_relations = {}, _relations[BADGE_PATH] = {
    type: 'descendant',

    linked: function linked(target) {
      this.data.badges.push(target);
      this.setActive();
    },
    unlinked: function unlinked(target) {
      this.data.badges = this.data.badges.filter(function (item) {
        return item !== target;
      });
      this.setActive();
    }
  }, _relations),

  properties: {
    active: {
      type: Number,
      value: 0,
      observer: function observer() {
        this.setActive();
      }
    }
  },

  data: {
    badges: []
  },

  attached: function attached() {
    this.currentActive = -1;
  },


  methods: {
    setActive: function setActive(badge) {
      var active = this.data.active;

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
      this.data.badges.forEach(function (badge, index) {
        badge.setActive(index === active);
      });
    }
  }
});