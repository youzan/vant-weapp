const DatePicker = require('./date-picker')
const { genNumber, moment } = require('./utils')


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
    pickerView: {
      type: Boolean
    },
    date: {
      type: String,
      observer(value) {
        if (value === ({}).toString()) {
          throw new Error('参数必须是一个字符串')
        }
        if (/^[0-9]+$/.test(value)) {
          value = +value
        }
        !this._inited && this._init()
        this.updateDate(value)
      }
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
    !this._inited && this._init()
  },
  
  methods: {
    _init () {
      this._inited = true
      this.use = {};

      ['years', 'months', 'days', 'hours', 'minutes', 'seconds'].forEach((item) => {
        if ((this.data.notUse || []).indexOf(item) === -1) {
          this.use[item] = true
        }
      });

      this.picker = new DatePicker(this.data.date)

      let { dataList, selected } = this.picker.getData(this.data.date)

      // 鬼他么知道为什么 dataList, selected 不能一起 setData
      this.setData({
        use: this.use,
        dataList
      }, () => {
        this.setData({
          selected
        })
      });
      
      this._indexs = selected
    },
    updatePicker(updateData = []) {
      let _updateData = {};
      
      for (const { col, index, data } of updateData) {
        if (~index && this._indexs[col] !== index || col === 0) {
          _updateData[`selected[${col}]`] = index // 更新索引
          this._indexs[col] = index
        }

        if (data) {
          _updateData[`dataList[${col}]`] = data;
        }
      }

      this.setData(_updateData);
    },

    updateDate (date) {
      let { dataList, selected } = this.picker.getData(date)
      this._indexs = selected
      
      // 好像必须要等到 datalist 完成
      this.setData({ dataList }, () => {
        this.setData({
          selected,
          text: this.getFormatStr()
        })
      })
    },

    getFormatStr() {
      let date = new Date();
      ['FullYear', 'Month', 'Date', 'Hours', 'Minutes', 'Seconds'].forEach((key, index) => {
        let value = this.data.dataList[index][this._indexs[index]];
        if (key === 'Month') {
          value = +this.data.dataList[index][this._indexs[index]] - 1;
        }
        date[`set${key}`](+value);
      });

      return moment(date, this.data.format);
    },

    showPicker() {
      this.setData({
        show: true
      });
    },

    hidePicker(e) {
      let { action } = e.currentTarget.dataset;

      this.setData({
        show: false
      });

      if (action === 'cancel') {
        this.cancel({
          detail: {}
        });
      } else {
        this.change({
          detail: {
            value: this._indexs
          }
        });
      }
    },
    
    columnchange(e) {
      let { column, value } = e.detail;
      let updateData = this.picker.update(column, value);
      this.updatePicker(updateData)
    },

    change(e) {
      let { value } = e.detail;

      let data = this.data.dataList.map((item, index) => {
        return +item[value[index]];
      });

      let day = data.slice(0, 3)
      let time = data.slice(3, 6)
      let date = new Date(`${ day.join('/') } ${ time.join(':') }`)

      this.triggerEvent('change', {
        value: data,
        date
      });

      // 手动触发 columnchange
      for (let index = 0; index < value.length; index++) {
        if (this._indexs[index] !== value[index]) {
          this.columnchange({
            detail: {
              column: index,
              value: value[index]
            }
          })
        }
      }

      this.setData({
        text: this.getFormatStr()
      });
    },
    cancel(e) {
      this.triggerEvent('cancel', e.detail);
    }
  }
});
