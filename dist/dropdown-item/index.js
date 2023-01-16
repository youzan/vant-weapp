import { useParent } from '../common/relation';
import { VantComponent } from '../common/component';
VantComponent({
    classes: ['item-title-class'],
    field: true,
    relation: useParent('dropdown-menu', function () {
        this.updateDataFromParent();
    }),
    props: {
        value: {
            type: null,
            observer: 'rerender',
        },
        title: {
            type: String,
            observer: 'rerender',
        },
        disabled: Boolean,
        titleClass: {
            type: String,
            observer: 'rerender',
        },
        options: {
            type: Array,
            value: [],
            observer: 'rerender',
        },
        popupStyle: String,
        useBeforeToggle: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        transition: true,
        showPopup: false,
        showWrapper: false,
        displayTitle: '',
    },
    methods: {
        rerender() {
            wx.nextTick(() => {
                var _a;
                (_a = this.parent) === null || _a === void 0 ? void 0 : _a.updateItemListData();
            });
        },
        updateDataFromParent() {
            if (this.parent) {
                const { overlay, duration, activeColor, closeOnClickOverlay, direction, } = this.parent.data;
                this.setData({
                    overlay,
                    duration,
                    activeColor,
                    closeOnClickOverlay,
                    direction,
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
            this.onBeforeToggle(show).then((status) => {
                var _a;
                if (!status) {
                    return;
                }
                this.setData({
                    transition: !options.immediate,
                    showPopup: show,
                });
                if (show) {
                    (_a = this.parent) === null || _a === void 0 ? void 0 : _a.getChildWrapperStyle().then((wrapperStyle) => {
                        this.setData({ wrapperStyle, showWrapper: true });
                        this.rerender();
                    });
                }
                else {
                    this.rerender();
                }
            });
        },
        onBeforeToggle(status) {
            const { useBeforeToggle } = this.data;
            if (!useBeforeToggle) {
                return Promise.resolve(true);
            }
            return new Promise((resolve) => {
                this.$emit('before-toggle', {
                    status,
                    callback: (value) => resolve(value),
                });
            });
        },
    },
});
