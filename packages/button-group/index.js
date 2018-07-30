Component({
  relations: {
    '../button/index': {
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
  let buttons = this.getRelationNodes('../button/index');

  if (buttons.length > 0) {
    let lastIndex = buttons.length - 1;

    buttons.forEach((button, index) => {
      button.switchLastButtonStatus(index === lastIndex);
    });
  }
}
