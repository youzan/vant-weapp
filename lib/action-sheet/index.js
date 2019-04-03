"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var safe_area_1 = require("../mixins/safe-area");
component_1.VantComponent({
    mixins: [safe_area_1.safeArea()],
    props: {
        show: Boolean,
        title: String,
        cancelText: String,
        zIndex: {
            type: Number,
            value: 100
        },
        actions: {
            type: Array,
            value: []
        },
        overlay: {
            type: Boolean,
            value: true
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: true
        }
    },
    methods: {
        onSelect: function (event) {
            var index = event.currentTarget.dataset.index;
            var item = this.data.actions[index];
            if (item && !item.disabled && !item.loading) {
                this.$emit('select', item);
            }
        },
        onCancel: function () {
            this.$emit('cancel');
        },
        onClose: function () {
            this.$emit('close');
        }
    }
});
