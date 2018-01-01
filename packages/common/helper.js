// 从事件对象中解析得到 componentId
// 需要在元素上声明 data-component-id
function extractComponentId(event = {}) {
  const { dataset: { componentId } } = event.currentTarget || {};
  return componentId;
}

/*
  注：默认合并所有生命周期函数
  配置合并指定的生命周期 or 忽略指定字段
  const extend = extendCreator({
    life: ['onLoad', 'onPullDownRefresh'],
    exclude: ['binder']
  });

  Page(extend({}, {
    onLoad() {},
    ...
  }));
*/

const LIFE_CYCLE = ['onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage', 'onPageScroll'];

const extendCreator = (config = {}) => {
  const {
    life = LIFE_CYCLE,
    exclude = []
  } = config;

  const excludeList = exclude.concat(LIFE_CYCLE.map(getFuncArrayName));

  if (!Array.isArray(life) || !Array.isArray(exclude)) throw new Error('Invalid Extend Config');
  let lifeCycleList = life.filter(item => LIFE_CYCLE.indexOf(item) >= 0);
  return function extend(target, ...objList) {
    objList.forEach((source) => {
      if (source) {
        let keys = Object.keys(source);
        keys.forEach((key) => {
          let value = source[key];
          if (excludeList.indexOf(key) >= 0) return;
          if (lifeCycleList.indexOf(key) >= 0 && typeof value === 'function') {
            let funcArrayName = getFuncArrayName(key);
            if (!target[funcArrayName]) {
              target[funcArrayName] = [];
              if (target[key]) {
                target[funcArrayName].push(target[key]);
              }
              target[key] = function (...rest) {
                target[funcArrayName].forEach(func => func.apply(this, rest));
              };
            }

            if (source[funcArrayName]) {
              // 经过生命周期合并的组件直接整合函数列表
              target[funcArrayName].push(...source[funcArrayName]);
            } else {
              // 添加生命周期函数进入函数列表
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
};

const getFuncArrayName = name => `__$${name}`;

module.exports = {
  extractComponentId,
  extend: Object.assign,
  extendCreator
};
