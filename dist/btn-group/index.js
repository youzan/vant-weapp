'use strict';

Component({
  relations: {
    '../btn/index': {
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
  var btns = this.getRelationNodes('../btn/index');

  if (btns.length > 0) {
    var lastIndex = btns.length - 1;

    btns.forEach(function (btn, index) {
      btn.switchLastButtonStatus(index === lastIndex);
    });
  }
}