Component({
  relations: {
    '../btn/index': {
      type: 'child',
      linked() {
        updateBtnChild.call(this);
      },
      linkChange() {
        updateBtnChild.call(this);
      },
      unlinked() {
        updateBtnChild.call(this);
      }
    }
  }
});

function updateBtnChild() {
  let btns = this.getRelationNodes('../btn/index');

  if (btns.length > 0) {
    let lastIndex = btns.length - 1;

    btns.forEach((btn, index) => {
      btn.switchLastButtonStatus(index === lastIndex);
    });
  }
}
