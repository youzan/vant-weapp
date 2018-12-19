var isIPhoneX = null;

function getIsIPhoneX() {
  return new Promise(function (resolve, reject) {
    if (isIPhoneX !== null) {
      resolve(isIPhoneX);
    } else {
      wx.getSystemInfo({
        success: function success(_ref) {
          var model = _ref.model,
              screenHeight = _ref.screenHeight;
          var iphoneX = /iphone x/i.test(model);
          var iphoneNew = /iPhone11/i.test(model) && screenHeight === 812;
          isIPhoneX = iphoneX || iphoneNew;
          resolve(isIPhoneX);
        },
        fail: reject
      });
    }
  });
}

export var iphonex = Behavior({
  properties: {
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  },
  created: function created() {
    var _this = this;

    getIsIPhoneX().then(function (isIPhoneX) {
      _this.set({
        isIPhoneX: isIPhoneX
      });
    });
  }
});