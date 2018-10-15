export var button = Behavior({
  properties: {
    id: String,
    sessionFrom: String,
    appParameter: String,
    sendMessageImg: String,
    sendMessagePath: String,
    showMessageCard: String,
    sendMessageTitle: String,
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
    }
  }
});