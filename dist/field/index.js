const { extractComponentId } = require('../common/helper');

module.exports = {
  _handleZanFieldChange(event) {
    const componentId = extractComponentId(event);
    event.componentId = componentId;

    

    if (this.handleZanFieldChange) {
      return this.handleZanFieldChange(event);
    }

    console.warn('页面缺少 handleZanFieldChange 回调函数');
  },

  _handleZanFieldFocus(event) {
    const componentId = extractComponentId(event);
    event.componentId = componentId;

    

    if (this.handleZanFieldFocus) {
      return this.handleZanFieldFocus(event);
    }
  },

  _handleZanFieldBlur(event) {
    const componentId = extractComponentId(event);
    event.componentId = componentId;

    

    if (this.handleZanFieldBlur) {
      return this.handleZanFieldBlur(event);
    }
  }
};
