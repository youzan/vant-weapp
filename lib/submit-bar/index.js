"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var safe_area_1 = require("../mixins/safe-area");
component_1.VantComponent({
    mixins: [safe_area_1.safeArea()],
    classes: [
        'bar-class',
        'price-class',
        'button-class'
    ],
    props: {
        tip: null,
        type: Number,
        price: null,
        label: String,
        loading: Boolean,
        disabled: Boolean,
        buttonText: String,
        currency: {
            type: String,
            value: '¥'
        },
        buttonType: {
            type: String,
            value: 'danger'
        }
    },
    computed: {
        hasPrice: function () {
            return typeof this.data.price === 'number';
        },
        priceStr: function () {
            return (this.data.price / 100).toFixed(2);
        },
        tipStr: function () {
            var tip = this.data.tip;
            return typeof tip === 'string' ? tip : '';
        }
    },
    methods: {
        onSubmit: function (event) {
            this.$emit('submit', event.detail);
        }
    }
});
