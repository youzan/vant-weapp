"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    field: true,
    relation: {
        name: 'dropdown-item',
        type: 'descendant',
        linked: function (target) {
            this.children = this.children || [];
            this.children.push(target);
            target && this.setData({ itemListData: this.itemListData.push(target.data) });
            console.log('---child-1----', this.children, this.itemListData);
            // this.updateChild(target);
        },
        unlinked: function (target) {
            this.children = this.children.filter(function (child) { return child !== target; });
        }
    },
    props: {
        activeColor: String,
        overlay: {
            type: Boolean,
            value: true
        },
        zIndex: {
            type: Number,
            value: 10
        },
        duration: {
            type: Number,
            value: 0.2
        },
        direction: {
            type: String,
            value: 'down'
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: true
        }
    },
    data: {
        offset: 0,
        itemListData: ['a', 'b']
    },
    // mounted() {
    //   this._getAllItem();
    // },
    methods: {
        updateChildren: function () {
            var _this = this;
            (this.children || []).forEach(function (child) {
                return _this.updateChild(child);
            });
        },
        updateChild: function (child) {
            var _a = this.data, value = _a.value, disabled = _a.disabled;
            child.setData({
                value: value.indexOf(child.data.name) !== -1,
                disabled: disabled || child.data.disabled
            });
        },
        toggleItem: function (active) {
            this.children.forEach(function (item, index) {
                if (index === active) {
                    item.toggle();
                }
                else if (item.showPopup) {
                    item.toggle(false, { immediate: true });
                }
            });
        },
        onTitleTap: function (event) {
            var _a = event.currentTarget.dataset, item = _a.item, index = _a.index;
            if (!item.disabled) {
                this.toggleItem(index);
            }
        }
        // _getItemListData() {
        //   let nodes = this.getRelationNodes('../dropdown-item/index');
        //   if(nodes && nodes.length) {
        //     this.itemListData = nodes.map((node) => {
        //     })
        //   }
        //   console.log(nodes);
        // }
    }
});
