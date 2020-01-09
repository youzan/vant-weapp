"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    relation: {
        name: 'col',
        type: 'descendant',
        linked: function (target) {
            if (this.data.gutter) {
                target.setGutter(this.data.gutter);
            }
        }
    },
    props: {
        gutter: {
            type: Number,
            observer: 'setGutter'
        }
    },
    mounted: function () {
        if (this.data.gutter) {
            this.setGutter();
        }
    },
    methods: {
        setGutter: function () {
            var _this = this;
            var gutter = this.data.gutter;
            var margin = "-" + Number(gutter) / 2 + "px";
            var style = gutter
                ? "margin-right: " + margin + "; margin-left: " + margin + ";"
                : '';
            this.setData({ style: style });
            this.getRelationNodes('../col/index').forEach(function (col) {
                col.setGutter(_this.data.gutter);
            });
        }
    }
});
