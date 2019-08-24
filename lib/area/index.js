"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var shared_1 = require("../picker/shared");
component_1.VantComponent({
    classes: ['active-class', 'toolbar-class', 'column-class'],
    props: __assign({}, shared_1.pickerProps, { value: String, areaList: {
            type: Object,
            value: {}
        }, columnsNum: {
            type: [String, Number],
            value: 3
        } }),
    data: {
        columns: [{ values: [] }, { values: [] }, { values: [] }],
        displayColumns: [{ values: [] }, { values: [] }, { values: [] }]
    },
    watch: {
        value: function (value) {
            this.code = value;
            this.setValues();
        },
        areaList: 'setValues',
        columnsNum: function (value) {
            this.set({
                displayColumns: this.data.columns.slice(0, +value)
            });
        }
    },
    mounted: function () {
        var _this = this;
        setTimeout(function () {
            _this.setValues();
        }, 0);
    },
    methods: {
        getPicker: function () {
            if (this.picker == null) {
                this.picker = this.selectComponent('.van-area__picker');
            }
            return this.picker;
        },
        onCancel: function (event) {
            this.emit('cancel', event.detail);
        },
        onConfirm: function (event) {
            this.emit('confirm', event.detail);
        },
        emit: function (type, detail) {
            detail.values = detail.value;
            delete detail.value;
            this.$emit(type, detail);
        },
        onChange: function (event) {
            var _this = this;
            var _a = event.detail, index = _a.index, picker = _a.picker, value = _a.value;
            this.code = value[index].code;
            this.setValues().then(function () {
                _this.$emit('change', {
                    picker: picker,
                    values: picker.getValues(),
                    index: index
                });
            });
        },
        getConfig: function (type) {
            var areaList = this.data.areaList;
            return (areaList && areaList[type + "_list"]) || {};
        },
        getList: function (type, code) {
            var result = [];
            if (type !== 'province' && !code) {
                return result;
            }
            var list = this.getConfig(type);
            result = Object.keys(list).map(function (code) { return ({
                code: code,
                name: list[code]
            }); });
            if (code) {
                // oversea code
                if (code[0] === '9' && type === 'city') {
                    code = '9';
                }
                result = result.filter(function (item) { return item.code.indexOf(code) === 0; });
            }
            return result;
        },
        getIndex: function (type, code) {
            var compareNum = type === 'province' ? 2 : type === 'city' ? 4 : 6;
            var list = this.getList(type, code.slice(0, compareNum - 2));
            // oversea code
            if (code[0] === '9' && type === 'province') {
                compareNum = 1;
            }
            code = code.slice(0, compareNum);
            for (var i = 0; i < list.length; i++) {
                if (list[i].code.slice(0, compareNum) === code) {
                    return i;
                }
            }
            return 0;
        },
        setValues: function () {
            var _this = this;
            var county = this.getConfig('county');
            var code = this.code || Object.keys(county)[0] || '';
            var province = this.getList('province');
            var city = this.getList('city', code.slice(0, 2));
            var picker = this.getPicker();
            if (!picker) {
                return;
            }
            var stack = [];
            stack.push(picker.setColumnValues(0, province, false));
            stack.push(picker.setColumnValues(1, city, false));
            if (city.length && code.slice(2, 4) === '00') {
                code = city[0].code;
            }
            stack.push(picker.setColumnValues(2, this.getList('county', code.slice(0, 4)), false));
            return Promise.all(stack)
                .catch(function () { })
                .then(function () {
                return picker.setIndexes([
                    _this.getIndex('province', code),
                    _this.getIndex('city', code),
                    _this.getIndex('county', code)
                ]);
            })
                .catch(function () { });
        },
        getValues: function () {
            var picker = this.getPicker();
            return picker ? picker.getValues().filter(function (value) { return !!value; }) : [];
        },
        getDetail: function () {
            var values = this.getValues();
            var area = {
                code: '',
                country: '',
                province: '',
                city: '',
                county: ''
            };
            if (!values.length) {
                return area;
            }
            var names = values.map(function (item) { return item.name; });
            area.code = values[values.length - 1].code;
            if (area.code[0] === '9') {
                area.country = names[1] || '';
                area.province = names[2] || '';
            }
            else {
                area.province = names[0] || '';
                area.city = names[1] || '';
                area.county = names[2] || '';
            }
            return area;
        },
        reset: function () {
            this.code = '';
            return this.setValues();
        }
    }
});
