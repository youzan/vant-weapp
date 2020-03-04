import { VantComponent } from '../common/component';
VantComponent({
    field: true,
    relation: {
        name: 'dropdown-menu',
        type: 'ancestor',
        current: 'dropdown-item',
        linked() {
            this.updateDataFromParent();
        }
    },
    props: {
        value: {
            type: null,
            observer: 'rerender'
        },
        title: {
            type: String,
            observer: 'rerender'
        },
        disabled: Boolean,
        titleClass: {
            type: String,
            observer: 'rerender'
        },
        options: {
            type: Array,
            value: [],
            observer: 'rerender'
        },
        popupStyle: String
    },
    data: {
        transition: true,
        showPopup: false,
        showWrapper: false,
        displayTitle: ''
    },
    methods: {
        rerender() {
            wx.nextTick(() => {
                this.parent && this.parent.updateItemListData();
            });
        },
        updateDataFromParent() {
            if (this.parent) {
                const { overlay, duration, activeColor, closeOnClickOverlay, direction } = this.parent.data;
                this.setData({
                    overlay,
                    duration,
                    activeColor,
                    closeOnClickOverlay,
                    direction
                });
            }
        },
        onOpen() {
            this.$emit('open');
        },
        onOpened() {
            this.$emit('opened');
        },
        onClose() {
            this.$emit('close');
        },
        onClosed() {
            this.$emit('closed');
            this.setData({ showWrapper: false });
        },
        onOptionTap(event) {
            const { option } = event.currentTarget.dataset;
            const { value } = option;
            const shouldEmitChange = this.data.value !== value;
            this.setData({ showPopup: false, value });
            this.$emit('close');
            this.rerender();
            if (shouldEmitChange) {
                this.$emit('change', value);
            }
        },
        toggle(show, options = {}) {
            const { showPopup } = this.data;
            if (typeof show !== 'boolean') {
                show = !showPopup;
            }
            if (show === showPopup) {
                return;
            }
            this.setData({
                transition: !options.immediate,
                showPopup: show,
            });
            if (show) {
                this.parent.getChildWrapperStyle().then((wrapperStyle) => {
                    this.setData({ wrapperStyle, showWrapper: true });
                    this.rerender();
                });
            }
            else {
                this.rerender();
            }
        }
    }
});
