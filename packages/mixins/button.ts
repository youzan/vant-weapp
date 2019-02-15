export const button = Behavior({
  externalClasses: ['hover-class'],

  properties: {
    id: String,
    lang: {
      type: String,
      value: 'en'
    },
    businessId: Number,
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: String,
    appParameter: String,
    ariaLabel: String
  }
});
