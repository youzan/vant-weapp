import { classNames } from '../common/class-names';

export const basic = Behavior({
  created() {
    wx.getSystemInfo({
      success: ({ model, screenHeight }) => {
        const isIphoneX = /iphone x/i.test(model);
        const isIphoneNew = /iPhone11/i.test(model) && screenHeight === 812;

        if (isIphoneX || isIphoneNew) {
          this.set({
            isIPhoneX: true
          });
        }
      }
    });
  },

  methods: {
    classNames,

    $emit() {
      this.triggerEvent.apply(this, arguments);
    },

    getRect(selector, all) {
      return new Promise(resolve => {
        wx.createSelectorQuery()
          .in(this)[all ? 'selectAll' : 'select'](selector)
          .boundingClientRect(rect => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }

            if (!all && rect) {
              resolve(rect);
            }
          })
          .exec();
      });
    }
  }
});
