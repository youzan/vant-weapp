const config = require('./config');

Page({
  data: {
    config,
    value: 'test',
    textareaValue: 'test textarea',
    area: ['省份', '北京市', '天津市', '河北省', '山西省', '内蒙古自治区', '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区', '海南省', '重庆市', '四川省', '贵州省', '云南省', '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔自治区', '台湾省', '香港特别行政区', '澳门特别行政区'],
    areaIndex: 0,
    // picker-view 示例配置
    pickerViewConfig: {
      show: false,
      value: [0, 0],
      year: [2016, 2017, 2018],
      sex: ['男', '女']
    }
  },

  onAreaChange(e) {
    this.setData({
      areaIndex: e.detail.value
    });
  },

  handleZanFieldChange(e) {
    const { detail } = e;

    console.log('[zan:field:change]', detail);
  },

  handleZanFieldFocus(e) {
    const { detail } = e;

    console.log('[zan:field:focus]', detail);
  },

  handleZanFieldBlur(e) {
    const { detail } = e;

    console.log('[zan:field:blur]', detail);
  },

  clearInput() {
    this.setData({
      value: ''
    });
  },

  clearTextarea() {
    this.setData({
      textareaValue: ''
    });
  },

  formSubmit(event) {
    console.log('[zan:field:submit]', event.detail.value);
  },

  formReset(event) {
    console.log('[zan:field:reset]', event);
  },

  /* piker-view 示例相关函数 */
  handleDateFieldClick() {
    this.setData({
      'pickerViewConfig.show': true
    });
  },

  handlePopupDateChange(e) {
    this.setData({
      'pickerViewConfig.value': e.detail.value
    });
  },

  hideDatePopup() {
    this.setData({
      'pickerViewConfig.show': false
    });
  }

});
