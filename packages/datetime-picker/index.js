function partStartWithZero(num, strlen) {
  let zeros = '';
  while (zeros.length < strlen) {
    zeros += '0';
  }
  return (zeros + num).slice(-strlen);
}

function genNumber(begin, end, strlen) {
  let nums = [];
  while (begin <= end) {
    nums.push(partStartWithZero(begin, strlen));
    begin++;
  }
  return nums;
}

function moment(date, formatStr = 'YYYY:MM:DD') {
  if (!date && date !== 0) date = new Date();

  date = new Date(date);
  if (date.toString() === 'Invalid Date') throw new Error('Invalid Date');

  let getDateValue = (method, fn) => (fn ? fn(date[`get${method}`]()) : date[`get${method}`]());
  let map = new Map();

  map.set(/(Y+)/i, () => getDateValue('FullYear', year => (year + '').substr(4 - RegExp.$1.length)));
  map.set(/(M+)/, () => getDateValue('Month', month => partStartWithZero(month + 1, RegExp.$1.length)));
  map.set(/(D+)/i, () => getDateValue('Date', date => partStartWithZero(date, RegExp.$1.length)));
  map.set(/(H+)/i, () => getDateValue('Hours', hour => partStartWithZero(hour, RegExp.$1.length)));
  map.set(/(m+)/, () => getDateValue('Minutes', minute => partStartWithZero(minute, RegExp.$1.length)));
  map.set(/(s+)/, () => getDateValue('Seconds', second => partStartWithZero(second, RegExp.$1.length)));

  for (const [reg, fn] of map) {
    if (reg.test(formatStr)) {
      formatStr = formatStr.replace(RegExp.$1, fn.call(null));
    }
  }

  return formatStr;
}

const LIMIT_YEAR_COUNT = 50;
class DatePicker {
  constructor(format, date = new Date(), cb) {
    this.types = ['year', 'month', 'day', 'hour', 'minute', 'second'];
    this.months = genNumber(1, 12, 2);
    this.hours = genNumber(0, 23, 2);
    this.seconds = genNumber(0, 59, 2);
    this.minutes = genNumber(0, 59, 2);
    // this.format(format);
    this.init(date, cb);
  }

  getYears(year) {
    let mid = Math.floor(LIMIT_YEAR_COUNT / 2);
    let min = year - mid;
    let max = year + (LIMIT_YEAR_COUNT - mid);
    return genNumber(min, max, 4);
  }

  lastDay(year, month) {
    return month !== 12 ? new Date(
      new Date(`${year}/${month + 1}/1`).getTime() - (24 * 60 * 60 * 1000)
    ).getDate() : 31;
  }

  init(date, cb) {
    let d = new Date(date);
    let y = d.getFullYear();
    let m = d.getMonth() + 1;
    let years = this.getYears(y);
    let lastDay = this.lastDay(y, m);

    let days = genNumber(1, lastDay, 2);

    this._years = years;
    this._dataList = [years, this.months, days, this.hours, this.minutes, this.seconds];
    this._indexs = [25, m - 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()];
    cb && cb({
      dataList: this._dataList,
      indexs: this._indexs
    });
  }

  update(col, index, cb) {
    let type = this.types[col];
    switch (type) {
      case 'year':
        this._updateYear(col, index, cb);
        break;
      case 'month':
        this._updateMonth(col, index, cb);
        break;
      default:
        this._indexs[col] = index;
        cb && cb({
          dataList: this._dataList,
          indexs: this._indexs,
          updateColumn: col,
          updateIndex: index
        });
    }
  }

  _updateYear(col, index, cb) {
    let years = this._dataList[col];
    let year = years[index];

    this._dataList[col] = this.getYears(+year);

    this._indexs[col] = Math.floor(LIMIT_YEAR_COUNT / 2);
    cb && cb({
      dataList: this._dataList,
      indexs: this._indexs,
      updateColumn: col
    });
  }

  _updateMonth(col, index, cb) {
    let month = this._dataList[col][index];
    let year = this._dataList[0][this._indexs[0]];
    let lastDay = this.lastDay(+year, +month);
    this._indexs[col] = index;
    this._dataList[2] = genNumber(1, lastDay, 2);
    this._indexs[2] = this._indexs[2] >= this._dataList[2].length ? this._dataList[2].length - 1 : this._indexs[2];
    cb && cb({
      dataList: this._dataList,
      indexs: this._indexs,
      updateColumn: 2,
      updateIndex: this._indexs[2]
    });
    cb && cb({
      dataList: this._dataList,
      indexs: this._indexs,
      updateColumn: 1,
      updateIndex: index
    });
  }
}
// 组件内使用 this.indexs 好像有问题
let _indexs = [];
Component({
  properties: {
    placeholder: {
      type: String,
      value: '请选择时间'
    },
    format: {
      type: String,
      value: 'YYYY-MM-DD HH:mm:ss'
    },
    native: {
      type: Boolean
    },
    pickerView: {
      type: Boolean
    },
    date: {
      type: String,
      value: new Date()
    },
    notUse: {
      type: Array
    }
  },
  externalClasses: ['placeholder-class'],
  data: {
    transPos: [0, 0, 0, 0, 0, 0]
  },
  attached() {
    this.use = {}
    ;['years', 'months', 'days', 'hours', 'minutes', 'seconds'].forEach((item) => {
      if ((this.data.notUse || []).indexOf(item) === -1) { this.use[item] = true }
    });
    this.setData({ use: this.use });
    this.data.pickerView && !this.data.native && this.showPicker();
  },
  ready() {
    // 微信 bug，如果不先定义会导致不能选中
    this.setData({
      "dataList":[
        [
          "2018","2019","2020","2021","2022","2023","2024","2025","2026","2027","2028","2029","2030","2031","2032","2033","2034","2035","2036","2037","2038","2039","2040","2041","2042","2043"
        ],
        genNumber(1, 12, 2),
        genNumber(0, 31, 2),
        genNumber(0, 23, 2),
        genNumber(0, 59, 2),
        genNumber(0, 59, 2)
      ]
    })
    this.picker = new DatePicker(this.data.format, this.data.date, this.updatePicker.bind(this));
  },
  methods: {
    updatePicker({ dataList, indexs, updateColumn, updateIndex }) {
      let updateData = {};
      _indexs = indexs;
      // 指定更新某列数据，表示某列数据更新
      if (updateColumn) {
        updateData[`transPos[${updateColumn}]`] = -36 * _indexs[updateColumn];
        updateData[`dataList[${updateColumn}]`] = dataList[updateColumn];
      }
      // 指定更新某列索引，表示某列数据选中的索引已更新
      if (typeof updateIndex !== 'undefined') {
        updateData[`transPos[${updateColumn}]`] = -36 * _indexs[updateColumn];
        updateData[`selected[${updateColumn}]`] = indexs[updateColumn];
      }

      // 只在初始化时设置全部的值，其他的都局部更新
      if (!updateColumn && typeof updateIndex === 'undefined') {
        updateData = { dataList, selected: indexs };
        _indexs.forEach((item, index) => {
          updateData[`transPos[${index}]`] = -item * 36;
        });
      }

      this.setData(updateData);
    },
    touchmove(e) {
      let { changedTouches, target } = e;
      let col = target.dataset.col;
      let { clientY } = changedTouches[0];
      if (!col) return;

      let updateData = {};
      let itemLength = this.data.dataList[col].length;
      updateData[`transPos[${col}]`] = this.startTransPos + (clientY - this.startY);
      if (updateData[`transPos[${col}]`] >= 0) {
        updateData[`transPos[${col}]`] = 0;
      } else if (-(itemLength - 1) * 36 >= updateData[`transPos[${col}]`]) {
        updateData[`transPos[${col}]`] = -(itemLength - 1) * 36;
      }
      this.setData(updateData);
    },
    touchStart(e) {
      let { target, changedTouches } = e;
      let col = target.dataset.col;
      let touchData = changedTouches[0];
      if (!col) return;

      this.startY = touchData.clientY;
      this.startTime = e.timeStamp;
      this.startTransPos = this.data.transPos[col];
    },
    touchEnd(e) {
      let { col } = e.target.dataset;
      if (!col) return;
      let pos = this.data.transPos[col];
      let itemIndex = Math.round(pos / 36);

      this.columnchange({ detail: { column: +col, value: -itemIndex } });
    },
    columnchange(e) {
      let { column, value } = e.detail;
      _indexs[column] = value;
      this.picker.update(column, value, this.updatePicker.bind(this));
      this.data.pickerView && !this.data.native && this.change({detail: {value: _indexs}})
    },
    getFormatStr() {
      let date = new Date()
      ;['FullYear', 'Month', 'Date', 'Hours', 'Minutes', 'Seconds'].forEach((key, index) => {
        let value = this.data.dataList[index][_indexs[index]];
        if (key === 'Month') {
          value = +this.data.dataList[index][_indexs[index]] - 1;
        }
        date[`set${key}`](+value);
      });

      return moment(date, this.data.format);
    },
    showPicker() {
      this.setData({ show: true });
    },
    hidePicker(e) {
      let { action } = e.currentTarget.dataset;
      this.setData({ show: false });
      if (action === 'cancel') {
        this.cancel({ detail: {} });
      } else {
        this.change({ detail: { value: _indexs } });
      }
    },
    change(e) {
      let { value } = e.detail;
      
      let data = this.data.dataList.map((item, index) => {
        return +item[value[index]];
      });

      this.triggerEvent('change', { value: data });

      // 为了支持原生 picker view，每次 change 都需要手动 columnchange
      if (this.data.pickerView && this.data.native) {
        for (let index = 0; index < value.length; index++) {
          if (_indexs[index] !== value[index]) {
            this.columnchange({
              detail: {
                column: index, value: value[index]
              }
            })
            break // 这里每次只处理一列，否则会出现日期值为 undefined 的情况
          }
        }
      }

      this.setData({ text: this.getFormatStr() });
    },
    cancel(e) {
      this.triggerEvent('cancel', e.detail);
    }
  }
});
