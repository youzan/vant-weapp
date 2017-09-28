var Zan = require('../../dist/index');
var regionData = require('./data');

Page(Object.assign({}, Zan.Form, {
  data: {
    area: ['省份', '北京市', '天津市', '河北省', '山西省', '内蒙古自治区', '辽宁省', '吉林省', '黑龙江省', '上海市', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '广西壮族自治区', '海南省', '重庆市', '四川省', '贵州省', '云南省', '西藏自治区', '陕西省', '甘肃省', '青海省', '宁夏回族自治区', '新疆维吾尔自治区', '台湾省', '香港特别行政区', '澳门特别行政区'],
    areaIndex: 0,
    homeAddress: {},
    address: {}
  },

  onLoad: function () {
    /**
     * @param {String} componentId
     * @param {JSON} regionData
     * @param {Array} defaultRegion
     */
    this.initRegionData('homeAddress', regionData, [8,0,0]);
    this.initRegionData('address', regionData);
  },

  onShow: function () {
  },

  onAreaChange: function (e) {
    this.setData({
      areaIndex: e.detail.value
    });
  },

  handleZanRegionChange(componentId, regionSource) {
    this.setData({
      [`${componentId}`]: Object.assign({}, this.data[`${componentId}`], regionSource)
    });
  },
  handleZanRegionDialogChange(componentId) {
    this.setData({
      [`${componentId}.isShow`]: !this.data[`${componentId}`].isShow
    });
  },

  submitInfo() {
    const submitData = {
      homeAddress: this.data.homeAddress.county ? this.data.homeAddress.countyCode : this.data.homeAddress.cityCode,
      address: this.data.address.county ? this.data.address.countyCode : this.data.address.cityCode,
    }
    // 发送区域代码
    console.log('submitData: ',submitData);
  }
}));
