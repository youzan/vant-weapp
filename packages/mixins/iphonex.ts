let isIphoneX;

function getIsIPhoneX() {
  return new Promise((resolve, reject) => {
    wx.getSystemInfo({
      success: ({ model, screenHeight }) => {
        const isIphoneX = /iphone x/i.test(model);
        const isIphoneNew = /iPhone11/i.test(model) && screenHeight === 812;

        resolve(isIphoneX || isIphoneNew);
      },
      fail: reject
    });
  });
}

export default Behavior({
  created() {

  }
});
