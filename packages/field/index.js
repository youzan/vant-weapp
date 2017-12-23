const { extractComponentId } = require('../common/helper');

module.exports = {
  _handleZanFieldChange(event) {
    const componentId = extractComponentId(event);
    event.componentId = componentId;

    console.info('[zan:field:change]', event);

    if (this.handleZanFieldChange) {
      return this.handleZanFieldChange(event);
    }

    console.warn('页面缺少 handleZanFieldChange 回调函数');
  },

  _handleZanFieldFocus(event) {
    const componentId = extractComponentId(event);
    event.componentId = componentId;

    console.info('[zan:field:focus]', event);

    if (this.handleZanFieldFocus) {
      return this.handleZanFieldFocus(event);
    }

    console.warn('页面缺少 handleZanFieldFocus 回调函数');
  },

  _handleZanFieldBlur(event) {
    const componentId = extractComponentId(event);
    event.componentId = componentId;

    console.info('[zan:field:blur]', event);

    if (this.handleZanFieldBlur) {
      return this.handleZanFieldBlur(event);
    }

    console.warn('页面缺少 handleZanFieldBlur 回调函数');
  }
};
