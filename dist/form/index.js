
var Form = {
  initFormRegion(regionData) {
    const provinces = [];
    const citys = [];
    const countys = [];

    for(let i=0;i<regionData.length;i++){
      provinces.push(regionData[i]);
    }
    // console.log('省份完成');
    for (let i = 0 ; i < regionData[0].sub.length; i++) {
      citys.push(regionData[0].sub[i])
    }
    // console.log('city完成');
    for (let i = 0 ; i < regionData[0].sub[0].sub.length; i++) {
      countys.push(regionData[0].sub[0].sub[i])
    }

    this.setData({
      'provinces': provinces,
      'citys':citys,
      'countys':countys,
      'province':regionData[10].name,
      'city':regionData[10].sub[0].name,
      'cityCode':regionData[10].sub[0].code,
      'county':regionData[10].sub[0].sub[4].name,
      'countyCode':regionData[10].sub[0].sub[4].code,
      regionData,
      values: [0, 0, 0],
      condition: false
    })
  },
  _bindRegionChange: function(e) {
    // console.log(e);
    var val = e.detail.value;
    var t = this.data.values;
    var regionData = this.data.regionData;

    if(val[0] != t[0]){
      // console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0 ; i < regionData[val[0]].sub.length; i++) {
        citys.push(regionData[val[0]].sub[i])
      }
      for (let i = 0 ; i < regionData[val[0]].sub[0].sub.length; i++) {
        countys.push(regionData[val[0]].sub[0].sub[i])
      }

      this.setData({
        province: this.data.provinces[val[0]].name,
        city: regionData[val[0]].sub[0].name,
        cityCode: regionData[val[0]].sub[0].code,
        citys:citys,
        county: regionData[val[0]].sub[0].sub[0].name,
        countyCode: regionData[val[0]].sub[0].sub[0].code,
        countys:countys,
        values: val,
        value:[val[0],0,0]
      })

      return;
    }
    if(val[1] != t[1]){
      // console.log('city no');
      const countys = [];

      for (let i = 0 ; i < regionData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(regionData[val[0]].sub[val[1]].sub[i])
      }

      this.setData({
        city: this.data.citys[val[1]].name,
        cityCode: this.data.citys[val[1]].code,
        county: regionData[val[0]].sub[val[1]].sub[0] ? regionData[val[0]].sub[val[1]].sub[0].name : '',
        countyCode: this.data.countys[0] ? this.data.countys[0].code : '',
        countys:countys,
        values: val,
        value:[val[0],val[1],0]
      })
      return;
    }
    if(val[2] != t[2]){
      // console.log('county no:', val);
      this.setData({
        county: this.data.countys[val[2]].name,
        countyCode: this.data.countys[val[2]].code,
        values: val,
        value:[val[0],val[1],val[2]]
      })
      return;
    }
  },
  _toggleRegionDialog:function(){
    this.setData({
      condition:!this.data.condition
    })
  }
};

module.exports = Form;
