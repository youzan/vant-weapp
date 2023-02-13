import { VantComponent } from '../common/component';
var FieldName;
(function (FieldName) {
    FieldName["TEXT"] = "text";
    FieldName["VALUE"] = "value";
    FieldName["CHILDREN"] = "children";
})(FieldName || (FieldName = {}));
const defaultFieldNames = {
    text: FieldName.TEXT,
    value: FieldName.VALUE,
    children: FieldName.CHILDREN,
};
VantComponent({
    props: {
        title: String,
        value: {
            type: String,
            observer: 'updateValue',
        },
        placeholder: {
            type: String,
            value: '请选择',
        },
        activeColor: {
            type: String,
            value: '#1989fa',
        },
        options: {
            type: Array,
            value: [],
            observer: 'updateOptions',
        },
        swipeable: {
            type: Boolean,
            value: false,
        },
        closeable: {
            type: Boolean,
            value: true,
        },
        showHeader: {
            type: Boolean,
            value: true,
        },
        closeIcon: {
            type: String,
            value: 'cross',
        },
        fieldNames: {
            type: Object,
            value: defaultFieldNames,
            observer: 'updateFieldNames',
        },
    },
    data: {
        tabs: [],
        activeTab: 0,
        textKey: FieldName.TEXT,
        valueKey: FieldName.VALUE,
        childrenKey: FieldName.CHILDREN,
    },
    created() {
        this.updateTabs();
    },
    methods: {
        updateOptions(val, oldVal) {
            const isAsync = !!(val.length && oldVal.length);
            this.updateTabs(isAsync);
        },
        updateValue(val) {
            if (val !== undefined) {
                const values = this.data.tabs.map((tab) => tab.selected && tab.selected[this.data.valueKey]);
                if (values.indexOf(val) > -1) {
                    return;
                }
            }
            this.updateTabs();
        },
        updateFieldNames() {
            const { text = 'text', value = 'value', children = 'children', } = this.data.fieldNames || defaultFieldNames;
            this.setData({
                textKey: text,
                valueKey: value,
                childrenKey: children,
            });
        },
        getSelectedOptionsByValue(options, value) {
            for (let i = 0; i < options.length; i++) {
                const option = options[i];
                if (option[this.data.valueKey] === value) {
                    return [option];
                }
                if (option[this.data.childrenKey]) {
                    const selectedOptions = this.getSelectedOptionsByValue(option[this.data.childrenKey], value);
                    if (selectedOptions) {
                        return [option, ...selectedOptions];
                    }
                }
            }
        },
        updateTabs(isAsync = false) {
            const { options, value } = this.data;
            if (value !== undefined) {
                const selectedOptions = this.getSelectedOptionsByValue(options, value);
                if (selectedOptions) {
                    let optionsCursor = options;
                    const tabs = selectedOptions.map((option) => {
                        const tab = {
                            options: optionsCursor,
                            selected: option,
                        };
                        const next = optionsCursor.find((item) => item[this.data.valueKey] === option[this.data.valueKey]);
                        if (next) {
                            optionsCursor = next[this.data.childrenKey];
                        }
                        return tab;
                    });
                    if (optionsCursor) {
                        tabs.push({
                            options: optionsCursor,
                            selected: null,
                        });
                    }
                    this.setData({
                        tabs,
                    });
                    wx.nextTick(() => {
                        this.setData({
                            activeTab: tabs.length - 1,
                        });
                    });
                    return;
                }
            }
            // 异步更新
            if (isAsync) {
                const { tabs } = this.data;
                tabs[tabs.length - 1].options =
                    options[options.length - 1][this.data.childrenKey];
                this.setData({
                    tabs,
                });
                return;
            }
            this.setData({
                tabs: [
                    {
                        options,
                        selected: null,
                    },
                ],
            });
        },
        onClose() {
            this.$emit('close');
        },
        onClickTab(e) {
            const { index: tabIndex, title } = e.detail;
            this.$emit('click-tab', { title, tabIndex });
            this.setData({
                activeTab: tabIndex,
            });
        },
        // 选中
        onSelect(e) {
            const { option, tabIndex } = e.currentTarget.dataset;
            if (option && option.disabled) {
                return;
            }
            const { valueKey, childrenKey } = this.data;
            let { tabs } = this.data;
            tabs[tabIndex].selected = option;
            if (tabs.length > tabIndex + 1) {
                tabs = tabs.slice(0, tabIndex + 1);
            }
            if (option[childrenKey]) {
                const nextTab = {
                    options: option[childrenKey],
                    selected: null,
                };
                if (tabs[tabIndex + 1]) {
                    tabs[tabIndex + 1] = nextTab;
                }
                else {
                    tabs.push(nextTab);
                }
                wx.nextTick(() => {
                    this.setData({
                        activeTab: tabIndex + 1,
                    });
                });
            }
            this.setData({
                tabs,
            });
            const selectedOptions = tabs.map((tab) => tab.selected).filter(Boolean);
            const params = {
                value: option[valueKey],
                tabIndex,
                selectedOptions,
            };
            this.$emit('change', params);
            if (!option[childrenKey]) {
                this.$emit('finish', params);
            }
        },
    },
});
