export var button = Behavior({
  properties: {
    id: String,
    appParameter: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: String,
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
    }
  }
});