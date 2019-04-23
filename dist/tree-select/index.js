import { VantComponent } from '../common/component';
const ITEM_HEIGHT = 44;
VantComponent({
    classes: [
        'main-item-class',
        'content-item-class',
        'main-active-class',
        'content-active-class',
        'main-disabled-class',
        'content-disabled-class'
    ],
    props: {
        items: Array,
        mainActiveIndex: {
            type: Number,
            value: 0
        },
        activeId: {
            type: [Number, String]
        },
        maxHeight: {
            type: Number,
            value: 300
        }
    },
    data: {
        subItems: [],
        mainHeight: 0,
        itemHeight: 0
    },
    watch: {
        items() {
            this.updateSubItems().then(() => {
                this.updateMainHeight();
            });
        },
        maxHeight() {
            this.updateItemHeight(this.data.subItems);
            this.updateMainHeight();
        },
        mainActiveIndex: 'updateSubItems'
    },
    methods: {
        // 当一个子项被选择时
        onSelectItem(event) {
            const { item } = event.currentTarget.dataset;
            if (!item.disabled) {
                this.$emit('click-item', item);
            }
        },
        // 当一个导航被点击时
        onClickNav(event) {
            const { index } = event.currentTarget.dataset;
            const item = this.data.items[index];
            if (!item.disabled) {
                this.$emit('click-nav', { index });
            }
        },
        // 更新子项列表
        updateSubItems() {
            const { items, mainActiveIndex } = this.data;
            const { children = [] } = items[mainActiveIndex] || {};
            this.updateItemHeight(children);
            return this.set({ subItems: children });
        },
        // 更新组件整体高度，根据最大高度和当前组件需要展示的高度来决定
        updateMainHeight() {
            const { items = [], subItems = [] } = this.data;
            const maxHeight = Math.max(items.length * ITEM_HEIGHT, subItems.length * ITEM_HEIGHT);
            this.set({ mainHeight: Math.min(maxHeight, this.data.maxHeight) });
        },
        // 更新子项列表高度，根据可展示的最大高度和当前子项列表的高度决定
        updateItemHeight(subItems) {
            const itemHeight = Math.min(subItems.length * ITEM_HEIGHT, this.data.maxHeight);
            return this.set({ itemHeight });
        }
    }
});
