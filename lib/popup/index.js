"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var transition_1 = require("../mixins/transition");
var safe_area_1 = require("../mixins/safe-area");
component_1.VantComponent({
    classes: [
        'enter-class',
        'enter-active-class',
        'enter-to-class',
        'leave-class',
        'leave-active-class',
        'leave-to-class'
    ],
    mixins: [transition_1.transition(false), safe_area_1.safeArea()],
    props: {
        transition: {
            type: String,
            observer: 'observeClass'
        },
        customStyle: String,
        overlayStyle: String,
        zIndex: {
            type: Number,
            value: 100
        },
        overlay: {
            type: Boolean,
            value: true
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: true
        },
        position: {
            type: String,
            value: 'center',
            observer: 'observeClass'
        }
    },
    created: function () {
        this.observeClass();
    },
    methods: {
        onClickOverlay: function () {
            this.$emit('click-overlay');
            if (this.data.closeOnClickOverlay) {
                this.$emit('close');
            }
        },
        observeClass: function () {
            var _a = this.data, transition = _a.transition, position = _a.position;
            var updateData = {
                name: transition || position
            };
            if (transition === 'none') {
                updateData.duration = 0;
            }
            this.set(updateData);
        }
    }
});
