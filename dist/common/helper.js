// 从事件对象中解析得到 componentId
// 需要在元素上声明 data-component-id
function extractComponentId(event = {}) {
  const { dataset: { componentId } } = event.currentTarget || {};
  return componentId;
}

module.exports = {
  extractComponentId
};
