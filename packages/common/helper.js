// 从事件对象中解析得到 componentId
// 需要在元素上声明 data-component-id
function extractComponentId(event = {}) {
  const { dataset: { componentId } } = event.currentTarget || {};
  return componentId;
}

const LIFE_CYCLE = ['onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage', 'onPageScroll'];
/*
  1. 直接合并所有生命周期函数
  Page(extend({}, {
    onLoad() {},
    ...
  }));

  2. 只合并指定的生命周期
  const extendOnload = extend(['onLoad']);
  Page(extendOnload({}, {
    onLoad() {},
    ...
  }));
*/
const extend = (obj, ...rest) => {
  if (Array.isArray(obj)) {
    let lifeCycleList = obj.filter(item => LIFE_CYCLE.indexOf(item) >= 0);
    return extendWithLife.bind(null, lifeCycleList);
  }
  return extendWithLife(LIFE_CYCLE, obj, ...rest);
};

const extendWithLife = (lifeCycleList, target, ...objList) => {
  objList.forEach((source) => {
    if (source) {
      let keys = Object.keys(source);
      keys.forEach((key) => {
        let value = source[key];
        if (lifeCycleList.indexOf(key) >= 0 && typeof value === 'function') {
          // 合并生命周期函数，可选择改成闭包函数列表
          let funcArrayName = `__$${key}`;
          if (!target[funcArrayName]) {
            target[funcArrayName] = [value];
            target[key] = function(...rest) {
              target[funcArrayName].forEach(func => func.apply(this, rest));
            };
          } else {
            target[funcArrayName].push(value);
          }
        } else {
          target[key] = value;
        }
      });
    }
  });
  return target;
};

module.exports = {
  extractComponentId,
  extend
};
