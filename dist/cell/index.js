const warn = (msg, getValue) => {
  console.warn(msg)
  return;

      if (type !== 'boolean' && type !== 'string') {
        warn('isLink 属性值必须是一个字符串或布尔值', this.data.isLink)
        return
      }

      if (['navigateTo', 'redirectTo', 'switchTab', 'reLaunch'].indexOf(this.data.linkType) === -1) {
        warn('linkType 属性可选值为 navigateTo，redirectTo，switchTab，reLaunch', this.data.linkType)
        return 
      }
      wx[this.data.linkType].call(wx, { url })
    },
    cellTap () {
      if (!this.data.onlyTapFooter) {
        this.navigateTo()
      }
    },
    notLastCell () {
      this.setData({ isLastCell: false })
    }
  }
})