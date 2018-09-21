import { VantComponent } from '../common/component';
VantComponent({
    props: {
        title: String,
        message: String,
        useSlot: Boolean,
        asyncClose: Boolean,
        showCancelButton: Boolean,
        confirmButtonOpenType: String,
        show: {
            type: Boolean,
            observer(show) {
                if (!show) {
                    this.setData({
                        loading: {
                            confirm: false,
                            cancel: false
                        }
                    });
                }
            }
        },
        zIndex: {
            type: Number,
            value: 100
        },
        confirmButtonText: {
            type: String,
            value: '确认'
        },
        cancelButtonText: {
            type: String,
            value: '取消'
        },
        showConfirmButton: {
            type: Boolean,
            value: true
        },
        overlay: {
            type: Boolean,
            value: true
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: false
        }
    },
    data: {
        loading: {
            confirm: false,
            cancel: false
        }
    },
    methods: {
        onConfirm() {
            this.handleAction('confirm');
        },
        onCancel() {
            this.handleAction('cancel');
        },
        onClickOverlay() {
            this.onClose('overlay');
        },
        handleAction(action) {
            if (this.data.asyncClose) {
                this.setData({
                    [`loading.${action}`]: true
                });
            }
            this.onClose(action);
        },
        close() {
            this.setData({ show: false });
        },
        onClose(action) {
            if (!this.data.asyncClose) {
                this.close();
            }
            this.$emit('close', action);
            this.$emit(action);
            const callback = this.data[action === 'confirm' ? 'onConfirm' : 'onCancel'];
            if (callback) {
                callback(this);
            }
        }
    }
});
