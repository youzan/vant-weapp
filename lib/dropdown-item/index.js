"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var utils_1 = require("../common/utils");
component_1.VantComponent({
    field: true,
    relation: {
        name: 'dropdown-menu',
        type: 'ancestor',
        linked: function (target) {
            this.parent = target;
            console.log('---parent---', this.parent);
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
        showPopup: true,
        showWrapper: true,
        displayTitle: ''
    },
    created: function () {
        this.computedInitData();
    },
    mounted: function () {
        this.initDataFromParent();
    },
    methods: {
        computedInitData: function () {
            var _a = this.data, title = _a.title, options = _a.options, value = _a.value;
            var displayTitle = title || '';
            var match = options.filter(function (option) { return option.value === value; });
            displayTitle = match.length ? match[0].text : '';
            console.log('==>', options, title, displayTitle);
            this.setData({ displayTitle: displayTitle });
        },
        initDataFromParent: function () {
            if (!this.parent) {
                return;
            }
            var data = this.parent.data;
            var zIndex = data.zIndex, offset = data.offset, direction = data.direction, overlay = data.overlay, duration = data.duration, activeColor = data.activeColor, closeOnClickOverlay = data.closeOnClickOverlay;
            var wrapperStyle = "z-index: " + zIndex + ";";
            if (direction === 'down') {
                wrapperStyle += "top: " + utils_1.addUnit(offset) + ";";
            }
            else {
                wrapperStyle += "bottom: " + utils_1.addUnit(offset) + ";";
            }
            this.setData({ wrapperStyle: wrapperStyle, overlay: overlay, duration: duration, activeColor: activeColor, closeOnClickOverlay: closeOnClickOverlay });
        },
        onClose: function () {
            this.$emit('close');
        },
        onOptionTap: function (event) {
            this.setData({ showPopup: false });
            var option = event.currentTarget.dataset.option;
            if (option.value !== this.data.value) {
                this.$emit('input', option.value);
                this.$emit('change', option.value);
            }
        },
        toggle: function (show, options) {
            if (show === void 0) { show = !this.data.showPopup; }
            if (options === void 0) { options = {}; }
            var _a = this.data, showPopup = _a.showPopup, showWrapper = _a.showWrapper;
            if (show === showPopup) {
                return;
            }
            if (show) {
                // this.parent.updateOffset();
                showWrapper = true;
            }
            this.setData({ transition: !options.immediate, showPopup: show, showWrapper: showWrapper });
        }
    }
});
