Component({
  relations: {
    '../cell/index': {
      type: 'child',
      linked (target) {}
    }
  },
  ready () {
    let cells = this.getRelationNodes('../cell/index')
    
    if (cells.length > 0) {
      let lastIndex = cells.length - 1
  
      cells.forEach((cell, index) => {
        if (index < lastIndex) cell.notLastCell()
      });
    }
  }
})