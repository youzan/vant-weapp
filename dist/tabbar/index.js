const ITEM_PATH = '../tabbar-item/index';

Component({
  options: {
    addGlobalClass: true
  },

  externalClasses: ['custom-class'],

  properties: {
    active: {
      type: Number,
      observer(active) {
        this.setData({ currentActive: active });
        this.setActiveItem();
      }
    },
    fixed: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 1
    }
  },

  data: {
    items: [],
    currentActive: -1
  },

  attached() {
    this.setData({ currentActive: this.data.active });
  },

  relations: {
    [ITEM_PATH]: {
      type: 'descendant',

      linked(target) {
        this.data.items.push(target);
        this.setActiveItem();
      },

      unlinked(target) {
        this.data.items = this.data.items.filter(item => item !== target);
        this.setActiveItem();
      }
    }
  },

  methods: {
    setActiveItem() {
      this.data.items.forEach((item, index) => {
        item.setData({
          active: index === this.data.currentActive,
          count: this.data.items.length
        });
      });
    },

    onChange(child) {
      const active = this.data.items.indexOf(child);
      if (active !== this.data.currentActive && active !== -1) {
        this.triggerEvent('change', active);
        this.setData({ currentActive: active });
        this.setActiveItem();
      }
    }
  }
});
