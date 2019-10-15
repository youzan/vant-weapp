"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    props: {
        show: Boolean,
        title: String,
        cancelText: String,
        description: String,
        round: {
            type: Boolean,
            value: true
        },
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
        },
        closeOnClickAction: {
            type: Boolean,
            value: true
        },
        safeAreaInsetBottom: {
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
                if (this.data.closeOnClickAction) {
                    this.onClose();
                }
            }
        },
        onCancel: function () {
            this.$emit('cancel');
        },
        onClose: function () {
            this.$emit('close');
        },
        onClickOverlay: function () {
            this.$emit('click-overlay');
            this.onClose();
        }
    }
});
