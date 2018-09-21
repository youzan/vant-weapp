import { VantComponent } from '../common/component';
VantComponent({
    props: {
        title: String,
        loading: Boolean,
        value: {
            type: String,
            observer(value) {
                this.code = value;
                this.setValues();
            }
        },
        itemHeight: {
            type: Number,
            value: 44
        },
        visibleItemCount: {
            type: Number,
            value: 5
        },
        columnsNum: {
            type: [String, Number],
            value: 3
        },
        areaList: {
            type: Object,
            value: {},
            observer() {
                this.setValues();
            }
        }
    },
    data: {
        pickerValue: [0, 0, 0],
        columns: []
    },
    computed: {
        displayColumns() {
            const { columns = [], columnsNum } = this.data;
            return columns.slice(0, +columnsNum);
        }
    },
    methods: {
        onCancel() {
            this.$emit('cancel', {
                values: this.getValues(),
                indexs: this.getIndexs()
            });
        },
        onConfirm() {
            this.$emit('confirm', {
                values: this.getValues(),
                indexs: this.getIndexs()
            });
        },
        onChange(event) {
            const { value } = event.detail;
            const { pickerValue, displayColumns } = this.data;
            const index = pickerValue.findIndex((item, index) => item !== value[index]);
            // 没有变更 或 选中项序号小于0 不处理
            if (index < 0 || value[index] < 0) {
                return;
            }
            const values = displayColumns[index];
            this.code = values[value[index]].code;
            this.setValues();
            this.$emit('change', {
                picker: this,
                values: this.getValues(),
                index
            });
        },
        getList(type, code) {
            let result = [];
            if (type !== 'province' && !code) {
                return result;
            }
            const list = this.data.areaList[`${type}_list`] || {};
            result = Object.keys(list).map(code => ({
                code,
                name: list[code]
            }));
            if (code) {
                result = result.filter(item => item.code.indexOf(code) === 0);
            }
            return result;
        },
        getIndex(type, code) {
            const compareNum = type === 'province' ? 2 : type === 'city' ? 4 : 6;
            const list = this.getList(type, code.slice(0, compareNum - 2));
            code = code.slice(0, compareNum);
            for (let i = 0; i < list.length; i++) {
                if (list[i].code.slice(0, compareNum) === code) {
                    return i;
                }
            }
            return 0;
        },
        setValues() {
            let code = this.code || Object.keys(this.data.areaList.county_list)[0] || '';
            const province = this.getList('province');
            const city = this.getList('city', code.slice(0, 2));
            this.setData({
                'columns[0]': province,
                'columns[1]': city
            });
            if (city.length && code.slice(2, 4) === '00') {
                code = city[0].code;
            }
            this.setData({
                'columns[2]': this.getList('county', code.slice(0, 4)),
                pickerValue: [
                    this.getIndex('province', code),
                    this.getIndex('city', code),
                    this.getIndex('county', code)
                ]
            });
        },
        getValues() {
            const { displayColumns = [], pickerValue = [] } = this.data;
            return displayColumns.map((option, index) => option[pickerValue[index]]);
        },
        getIndexs() {
            const { pickerValue, columnsNum } = this.data;
            return pickerValue.slice(0, columnsNum);
        },
        reset() {
            this.code = '';
            this.setValues();
        }
    }
});
