module.exports = {
  // 基础类型输入框配置
  base: {
    name: {
      focus: true,
      title: '收货人',
      placeholder: '名字'
    },
    tel: {
      error: true,
      title: '联系电话',
      inputType: 'number',
      placeholder: '请输入手机号'
    },
    address: {
      title: '详细地址',
      type: 'textarea',
      placeholder: '请输入详细地址(最多50字)'
    },
    disabled: {
      title: '用户信息',
      disabled: true,
      value: '输入框已禁用'
    }
  },
  // 无标题输入框
  notitle: {
    placeholder: '请输入收货人姓名',
    componentId: 'textarea:test'
  },
  // 圆角输入框
  radius: {
    totalPrice: {
      right: true,
      mode: 'wrapped',
      title: '消费总额',
      inputType: 'number',
      placeholder: '询问收银员后输入'
    },
    excludePrice: {
      right: true,
      error: true,
      mode: 'wrapped',
      title: '不参与优惠金额',
      inputType: 'number',
      placeholder: '询问收银员后输入'
    },
    notitle: {
      mode: 'wrapped',
      inputType: 'number',
      placeholder: '请输入消费金额'
    }
  },
  // Form 中使用输入框
  form: {
    name: {
      name: 'name',
      placeholder: '请输入收货人姓名',
      componentId: 'form:test:name'
    },
    tel: {
      name: 'tel',
      inputType: 'tel',
      placeholder: '请输入收货人手机号码',
      componentId: 'form:test:tel'
    }
  }
};
