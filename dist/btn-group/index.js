'use strict';

Component({
  relations: {
    '../button/index': {
      type: 'child',
      linked: function linked() {
        updateBtnChild.call(this);
      },
      linkChange: function linkChange() {
        updateBtnChild.call(this);
      },
      unlinked: function unlinked() {
        updateBtnChild.call(this);
      }
    }
  }
});

function updateBtnChild() {
  var buttons = this.getRelationNodes('../button/index');

  if (buttons.length > 0) {
    var lastIndex = buttons.length - 1;

    buttons.forEach(function (button, index) {
      button.switchLastButtonStatus(index === lastIndex);
    });
  }
}