module.exports = {
  _handleZanFieldChange(event) {
    const { componentId } = event.currentTarget.dataset;
    event.componentId = componentId;

    console.info('[zan:field:change]', event);

    if (this.handleZanFieldChange) {
      this.handleZanFieldChange(event);
    } else {
      console.warn('页面缺少 handleZanFieldChange 回调函数');
    }
  }
};
