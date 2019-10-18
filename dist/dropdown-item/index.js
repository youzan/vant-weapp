import { VantComponent } from '../common/component';
import { addUnit } from '../common/utils';
VantComponent({
    field: true,
    relation: {
        name: 'dropdown-menu',
        type: 'ancestor',
        linked(target) {
            this.parent = target;
            console.log('---parent---', this.parent);
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
        showPopup: true,
        showWrapper: true,
        displayTitle: ''
    },
    created() {
        this.computedInitData();
    },
    mounted() {
        this.initDataFromParent();
    },
    methods: {
        computedInitData() {
            const { title, options, value } = this.data;
            let displayTitle = title || '';
            const match = options.filter(option => option.value === value);
            displayTitle = match.length ? match[0].text : '';
            console.log('==>', options, title, displayTitle);
            this.setData({ displayTitle });
        },
        initDataFromParent() {
            if (!this.parent) {
                return;
            }
            const { data } = this.parent;
            const { zIndex, offset, direction, overlay, duration, activeColor, closeOnClickOverlay } = data;
            let wrapperStyle = `z-index: ${zIndex};`;
            if (direction === 'down') {
                wrapperStyle += `top: ${addUnit(offset)};`;
            }
            else {
                wrapperStyle += `bottom: ${addUnit(offset)};`;
            }
            this.setData({ wrapperStyle, overlay, duration, activeColor, closeOnClickOverlay });
        },
        onClose() {
            this.$emit('close');
        },
        onOptionTap(event) {
            this.setData({ showPopup: false });
            const { option } = event.currentTarget.dataset;
            if (option.value !== this.data.value) {
                this.$emit('input', option.value);
                this.$emit('change', option.value);
            }
        },
        toggle(show = !this.data.showPopup, options = {}) {
            let { showPopup, showWrapper } = this.data;
            if (show === showPopup) {
                return;
            }
            if (show) {
                // this.parent.updateOffset();
                showWrapper = true;
            }
            this.setData({ transition: !options.immediate, showPopup: show, showWrapper });
        }
    }
});
