import Page from '../../common/page';
import AreaList from './area';

Page({
  data: {
    areaList: AreaList,
    value: 330302
  },
  onChange(event) {
    console.log(event);
  }
});
