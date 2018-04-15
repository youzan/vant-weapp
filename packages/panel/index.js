Component({
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    // 标题
    title: {
      type: String,
      value: ''
    },
    // 内容区顶部是否取消10像素的间距
    hideTop :{
      type : Boolean ,
      value : false
    },
    // 内容区顶部是否取消边框
    hideBorder :{
      type : Boolean ,
      value : false
    }
  }
})
