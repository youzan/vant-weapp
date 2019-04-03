"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    classes: ['title-class', 'content-class'],
    relation: {
        name: 'collapse',
        type: 'ancestor',
        linked: function (parent) {
            this.parent = parent;
        }
    },
    props: {
        name: null,
        title: null,
        value: null,
        icon: String,
        label: String,
        disabled: Boolean,
        border: {
            type: Boolean,
            value: true
        },
        isLink: {
            type: Boolean,
            value: true
        }
    },
    data: {
        contentHeight: 0,
        expanded: false
    },
    beforeCreate: function () {
        this.animation = wx.createAnimation({
            duration: 300,
            timingFunction: 'ease-in-out'
        });
    },
    methods: {
        updateExpanded: function () {
            if (!this.parent) {
                return null;
            }
            var _a = this.parent.data, value = _a.value, accordion = _a.accordion, items = _a.items;
            var name = this.data.name;
            var index = items.indexOf(this);
            var currentName = name == null ? index : name;
            var expanded = accordion
                ? value === currentName
                : value.some(function (name) { return name === currentName; });
            if (expanded !== this.data.expanded) {
                this.updateStyle(expanded);
            }
            this.set({ index: index, expanded: expanded });
        },
        updateStyle: function (expanded) {
            var _this = this;
            this.getRect('.van-collapse-item__content').then(function (res) {
                var animationData = _this.animation
                    .height(expanded ? res.height : 0)
                    .step()
                    .export();
                if (expanded) {
                    _this.set({ animationData: animationData });
                }
                else {
                    _this.set({
                        contentHeight: res.height + 'px'
                    }, function () {
                        setTimeout(function () {
                            _this.set({ animationData: animationData });
                        }, 20);
                    });
                }
            });
        },
        onClick: function () {
            if (this.data.disabled) {
                return;
            }
            var _a = this.data, name = _a.name, expanded = _a.expanded;
            var index = this.parent.data.items.indexOf(this);
            var currentName = name == null ? index : name;
            this.parent.switch(currentName, !expanded);
        },
        onTransitionEnd: function () {
            if (this.data.expanded) {
                this.set({
                    contentHeight: 'auto'
                });
            }
        }
    }
});
