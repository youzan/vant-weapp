const LIMIT_YEAR_COUNT = 50;
const { genNumber, iso2utc } = require('./utils')

module.exports = class DatePicker {
  constructor(date = new Date()) {
    this.types = ['year', 'month', 'day', 'hour', 'minute', 'second'];
    this.months = genNumber(1, 12, 2);
    this.hours = genNumber(0, 23, 2);
    this.seconds = genNumber(0, 59, 2);
    this.minutes = genNumber(0, 59, 2);
    this._date = date
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

  getData (date) {
    date = date || this._date || new Date

    // toUTCString ISO 格式部分 ios 手机会失败
    if (new Date(date).toString() === 'Invalid Date' && typeof date === 'string' && date.indexOf('-') > 0) {
      date = iso2utc(date)
    }
    
    let d = new Date(date);
    
    let y = d.getFullYear();
    let m = d.getMonth() + 1;
    let years = this.getYears(y);
    let lastDay = this.lastDay(y, m);
    let days = genNumber(1, lastDay, 2);

    this._years = years;
    this._dataList = [years, this.months, days, this.hours, this.minutes, this.seconds];
    this._indexs = [25, m - 1, d.getDate() - 1, d.getHours(), d.getMinutes(), d.getSeconds()];

    return {
      dataList: this._dataList,
      selected: this._indexs
    }
  }

  update(col, index) {
    let type = this.types[col];
    switch (type) {
      case 'year':
        return this._updateYear(col, index);
      case 'month':
        return this._updateMonth(col, index);
      default:
        this._indexs[col] = index;
        return [{ col, index }]
    }
  }

  _updateYear(col, index, cb) {
    let years = this._dataList[col];
    let year = years[index];

    this._dataList[col] = this.getYears(+year);

    this._indexs[col] = Math.floor(LIMIT_YEAR_COUNT / 2);

    return [{ col: 0, index: this._indexs[col], data: this._dataList[col] }]
  }

  _updateMonth(col, index) {
    let month = this._dataList[col][index];
    let year = this._dataList[0][this._indexs[0]];
    let lastDay = this.lastDay(+year, +month);
    this._indexs[col] = index;
    this._dataList[2] = genNumber(1, lastDay, 2);
    this._indexs[2] = this._indexs[2] >= this._dataList[2].length ? this._dataList[2].length - 1 : this._indexs[2];

    return [
      {
        col: 1,
        index
      },
      {
        col: 2,
        index: this._indexs[2],
        data: this._dataList[2]
      }
    ]
  }
}