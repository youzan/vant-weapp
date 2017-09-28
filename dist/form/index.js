function handle(e, callback) {
  var dataset     = e.currentTarget.dataset;
  var componentId = dataset.componentId;
  var dataSource  = dataset.region;

  callback.call(this, componentId, dataSource, e);
}

function toggleRegionDialogCallback(componentId, regionSource) {
  if (this.handleZanRegionDialogChange) {
    this.handleZanRegionDialogChange(componentId);
  } else {
    console.warn('页面缺少 handleZanRegionDialogChange 回调函数');
  }
}

function regionChangeCallback(componentId, regionSource, e) {
  var val = e.detail.value;
  var t = regionSource.values;
  var regionData = regionSource.regionData;

  if(val[0] != t[0]){
    const citys = [];
    const countys = [];
    regionData[val[0]].sub.forEach((item) => { citys.push(item) });
    regionData[val[0]].sub[0].sub.forEach((item) => { countys.push(item) });
    
    if (this.handleZanRegionChange) {
      this.handleZanRegionChange(
        componentId,
        {
          province: regionSource.provinces[val[0]].name,
          city: regionData[val[0]].sub[0].name,
          cityCode: regionData[val[0]].sub[0].code,
          citys:citys,
          county: regionData[val[0]].sub[0].sub[0].name,
          countyCode: regionData[val[0]].sub[0].sub[0].code,
          countys:countys,
          values: val,
          value:[val[0],0,0]
        }
      );
    } else {
      console.warn('页面缺少 handleZanRegionChange 回调函数');
    }
    return;
  }
  if(val[1] != t[1]){
    const countys = [];
    regionData[val[0]].sub[val[1]].sub.forEach((item) => { countys.push(item) });
    
    if (this.handleZanRegionChange) {
      this.handleZanRegionChange(
        componentId,
        {
          city: regionSource.citys[val[1]].name,
          cityCode: regionSource.citys[val[1]].code,
          county: regionData[val[0]].sub[val[1]].sub[0] ? regionData[val[0]].sub[val[1]].sub[0].name : '',
          countyCode: regionSource.countys[0] ? regionSource.countys[0].code : '',
          countys:countys,
          values: val,
          value:[val[0],val[1],0]
        }
      );
    } else {
      console.warn('页面缺少 handleZanRegionChange 回调函数');
    }
    return;
  }
  if(val[2] != t[2]){
    if (this.handleZanRegionChange) {
      this.handleZanRegionChange(
        componentId,
        {
          county: regionSource.countys[val[2]].name,
          countyCode: regionSource.countys[val[2]].code,
          values: val,
          value:[val[0],val[1],val[2]]
        }
      );
    } else {
      console.warn('页面缺少 handleZanRegionChange 回调函数');
    }
    return;
  }
  
}

var Form = {
  _toggleRegionDialog(e) {
    handle.call(this, e, toggleRegionDialogCallback);
  },

  _handleZanRegionChange(e) {
    handle.call(this, e, regionChangeCallback);
  },
  initRegionData(componentId, regionData, defaultRegion) {
    const provinces = [];
    const citys = [];
    const countys = [];
    const initRegion = defaultRegion || [10, 0, 4];
    regionData.forEach((item) => { provinces.push(item) });
    regionData[initRegion[0]].sub.forEach((item) => { citys.push(item) });
    regionData[initRegion[0]].sub[initRegion[1]].sub.forEach((item) => { countys.push(item) });

    if (this.handleZanRegionChange) {
      this.handleZanRegionChange(
        componentId,
        {
          provinces: provinces,
          citys: citys,
          countys: countys,
          province: regionData[initRegion[0]].name,
          city: regionData[initRegion[0]].sub[initRegion[1]].name,
          cityCode: regionData[initRegion[0]].sub[initRegion[1]].code,
          county: regionData[initRegion[0]].sub[initRegion[1]].sub[initRegion[2]].name,
          countyCode: regionData[initRegion[0]].sub[initRegion[1]].sub[initRegion[2]].code,
          regionData,
          values: [initRegion[0], initRegion[1], initRegion[2]],
          value: [initRegion[0], initRegion[1], initRegion[2]],
          isShow: false
        }
      );
    } else {
      console.warn('页面缺少 handleZanRegionChange 回调函数');
    }
  }
};

module.exports = Form;
