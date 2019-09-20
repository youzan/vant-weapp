"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var link_1 = require("../mixins/link");
var component_1 = require("../common/component");
component_1.VantComponent({
    relation: {
        name: 'grid',
        type: 'ancestor',
        linked: function (parent) {
            this.parent = parent;
        }
    },
    mixins: [link_1.link],
    props: {
        icon: String,
        text: String,
        useSlot: Boolean
    },
    mounted: function () {
        this.updateStyle();
    },
    methods: {
        updateStyle: function () {
            if (!this.parent) {
                return;
            }
            var _a = this.parent, data = _a.data, children = _a.children;
            var columnNum = data.columnNum, border = data.border, square = data.square, gutter = data.gutter, clickable = data.clickable, center = data.center;
            var width = 100 / columnNum + "%";
            var styleWrapper = [];
            styleWrapper.push("width: " + width);
            if (square) {
                styleWrapper.push("padding-top: " + width);
            }
            if (gutter) {
                styleWrapper.push("padding-right: " + gutter + "px");
                var index = children.indexOf(this);
                if (index >= columnNum) {
                    styleWrapper.push("margin-top: " + gutter + "px");
                }
            }
            this.setData({
                style: styleWrapper.join('; '),
                center: center,
                border: border,
                square: square,
                gutter: gutter,
                clickable: clickable
            });
        },
        onClick: function () {
            this.$emit('click');
            this.jumpLink();
        }
    }
});
