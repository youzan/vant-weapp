var Quickpick = {
  _handleTapOnList(e) {
    var sourceList = e.currentTarget.dataset.source;
    var componentId = e.currentTarget.dataset.componentId;
    var tapedIdx = e.target.dataset.index;
    if (typeof tapedIdx !== 'number') {
      return;
    }

    if (sourceList[tapedIdx].hasOwnProperty('selected')) {
      if (this.handleZanQuickpickItems) {
        sourceList[tapedIdx].selected = !sourceList[tapedIdx].selected;
        this.handleZanQuickpickItems(componentId, sourceList[tapedIdx]);
      } else {
        console.warn('页面缺少 handleZanQuickpickItems 回调函数');
      }
    } else {
      if (this.handleZanQuickpickItem) {
        this.handleZanQuickpickItem(componentId, sourceList[tapedIdx]);
      } else {
        console.warn('页面缺少 handleZanQuickpickItem 回调函数');
      }
    }
  }
};

module.exports = Quickpick;
