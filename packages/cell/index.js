const warn = (msg, getValue) => {
  console.warn(msg)
  console.log('接受到的值为：', getValue)
}

Component({
  options: {
    multipleSlots: true
  },
  relations: {
    '../cell-group/index': {
      type: 'parent'
    }
  },
  properties: {
    title: {
      type: String,
      description: '左侧标题'
    },
    label: {
      type: String,
      description: '标题下方的描述信息'
    },
    value: {
      type: String,
      description: '右侧内容'
    },
    onlyTapFooter: {
      type: Boolean,
      description: '只有点击 footer 区域才触发 tab 事件'
    },
    isLink: {
      type: null,
      value: '',
      description: '是否展示右侧箭头并开启尝试以 url 跳转'
    },
    linkType: {
      type: String,
      value: 'navigateTo',
      description: '链接类型，可选值为 navigateTo，redirectTo，switchTab，reLaunch'
    },
    url: {
      type: String,
      value: ''
    }
  },
  data: {
    isLastCell: true
  },
  methods: {
    navigateTo () {
      const url = this.data.url
      const type = typeof this.data.isLink

      this.triggerEvent('tap', {})

      if (!this.data.isLink || !url || url === 'true' || url === 'false') return;

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