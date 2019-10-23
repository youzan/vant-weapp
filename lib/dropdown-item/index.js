"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    field: true,
    relation: {
        name: 'dropdown-menu',
        type: 'ancestor',
        linked: function (target) {
            this.parent = target;
        },
        unlinked: function () {
            this.parent = null;
        }
    },
    props: {
        value: null,
        title: String,
        disabled: Boolean,
        titleClass: String,
        options: {
            type: Array,
            value: []
        }
    },
    data: {
        transition: true,
        showPopup: false,
        showWrapper: false,
        displayTitle: ''
    },
    created: function () {
        this.setData({ displayTitle: this.computedDisplayTitle(this.data.value) });
    },
    methods: {
        computedDisplayTitle: function (curValue) {
            var _a = this.data, title = _a.title, options = _a.options;
            if (title) {
                return title;
            }
            var match = options.filter(function (option) { return option.value === curValue; });
            var displayTitle = match.length ? match[0].text : '';
            return displayTitle;
        },
        onClickOverlay: function () {
            this.toggle();
            this.$emit('close');
        },
        onOptionTap: function (event) {
            var _this = this;
            var _a = this.data, value = _a.value, displayTitle = _a.displayTitle;
            var option = event.currentTarget.dataset.option;
            var optionValue = option.value;
            if (optionValue !== value) {
                value = optionValue;
                displayTitle = this.computedDisplayTitle(optionValue);
                this.$emit('change', optionValue);
            }
            this.setData({ showPopup: false, value: value, displayTitle: displayTitle });
            var time = this.data.duration || 0;
            setTimeout(function () {
                _this.setData({ showWrapper: false });
            }, time);
            // parent 中的 itemListData 是 children 上的数据的集合
            // 数据的更新由 children 各自维护，但是模板的更新需要额外触发 parent 的 setData
            this.parent.setData({ itemListData: this.parent.data.itemListData });
        },
        toggle: function () {
            var childIndex = this.data.childIndex;
            this.parent.toggleItem(childIndex);
        }
    }
});
