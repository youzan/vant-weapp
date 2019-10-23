import { VantComponent } from '../common/component';
VantComponent({
    field: true,
    relation: {
        name: 'dropdown-menu',
        type: 'ancestor',
        linked(target) {
            this.parent = target;
        },
        unlinked() {
            this.parent = null;
        }
    },
    props: {
        value: null,
        title: String,
        disabled: Boolean,
        titleClass: String,
        options: {
            type: Array,
            value: []
        }
    },
    data: {
        transition: true,
        showPopup: false,
        showWrapper: false,
        displayTitle: ''
    },
    created() {
        this.setData({ displayTitle: this.computedDisplayTitle(this.data.value) });
    },
    methods: {
        computedDisplayTitle(curValue) {
            const { title, options } = this.data;
            if (title) {
                return title;
            }
            const match = options.filter(option => option.value === curValue);
            const displayTitle = match.length ? match[0].text : '';
            return displayTitle;
        },
        onClickOverlay() {
            this.toggle();
            this.$emit('close');
        },
        onOptionTap(event) {
            let { value, displayTitle } = this.data;
            const { option } = event.currentTarget.dataset;
            const { value: optionValue } = option;
            if (optionValue !== value) {
                value = optionValue;
                displayTitle = this.computedDisplayTitle(optionValue);
                this.$emit('change', optionValue);
            }
            this.setData({ showPopup: false, value, displayTitle });
            const time = this.data.duration || 0;
            setTimeout(() => {
                this.setData({ showWrapper: false });
            }, time);
            // parent 中的 itemListData 是 children 上的数据的集合
            // 数据的更新由 children 各自维护，但是模板的更新需要额外触发 parent 的 setData
            this.parent.setData({ itemListData: this.parent.data.itemListData });
        },
        toggle() {
            const { childIndex } = this.data;
            this.parent.toggleItem(childIndex);
        }
    }
});
