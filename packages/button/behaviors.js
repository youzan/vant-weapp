module.exports = Behavior({
  properties: {
    loading: Boolean,
    // 在自定义组件中，无法与外界的 form 组件联动，暂时不开放
    // formType: String,
    openType: String,
    appParameter: String,
    // 暂时不开放，直接传入无法设置样式
    // hoverClass: {
    //   type: String,
    //   value: 'button-hover'
    // },
    hoverStopPropagation: Boolean,
    hoverStartTime: {
      type: Number,
      value: 20
    },
    hoverStayTime: {
      type: Number,
      value: 70
    },
    lang: {
      type: String,
      value: 'en'
    },
    sessionFrom: {
      type: String,
      value: ''
    },
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: String
  },

  methods: {
    bindgetuserinfo(event = {}) {
      this.triggerEvent('getuserinfo', event.detail || {});
    },

    bindcontact(event = {}) {
      this.triggerEvent('contact', event.detail || {});
    },

    bindgetphonenumber(event = {}) {
      this.triggerEvent('getphonenumber', event.detail || {});
    },

    bindopensetting(event = {}) {
      this.triggerEvent('opensetting', event.detail || {});
    },

    binderror(event = {}) {
      this.triggerEvent('error', event.detail || {});
    }
  }
});
