import { VantComponent } from '../common/component';
VantComponent({
    field: true,
    relation: {
        name: 'dropdown-item',
        type: 'descendant',
        linked(target) {
            this.children = this.children || [];
            this.children.push(target);
            target && this.setData({ itemListData: this.itemListData.push(target.data) });
            console.log('---child-1----', this.children, this.itemListData);
            // this.updateChild(target);
        },
        unlinked(target) {
            this.children = this.children.filter((child) => child !== target);
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
        updateChildren() {
            (this.children || []).forEach((child) => this.updateChild(child));
        },
        updateChild(child) {
            const { value, disabled } = this.data;
            child.setData({
                value: value.indexOf(child.data.name) !== -1,
                disabled: disabled || child.data.disabled
            });
        },
        toggleItem(active) {
            this.children.forEach((item, index) => {
                if (index === active) {
                    item.toggle();
                }
                else if (item.showPopup) {
                    item.toggle(false, { immediate: true });
                }
            });
        },
        onTitleTap(event) {
            const { item, index } = event.currentTarget.dataset;
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
