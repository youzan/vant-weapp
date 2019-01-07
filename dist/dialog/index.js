import { VantComponent } from '../common/component';
import { openType } from '../mixins/open-type';
VantComponent({
  mixins: [openType],
  props: {
    show: Boolean,
    title: String,
    message: String,
    useSlot: Boolean,
    asyncClose: Boolean,
    messageAlign: String,
    showCancelButton: Boolean,
    closeOnClickOverlay: Boolean,
    confirmButtonOpenType: String,
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
    transition: {
      type: String,
      value: 'scale'
    }
  },
  data: {
    loading: {
      confirm: false,
      cancel: false
    }
  },
  watch: {
    show: function show(_show) {
      !_show && this.stopLoading();
    }
  },
  methods: {
    onConfirm: function onConfirm() {
      this.handleAction('confirm');
    },
    onCancel: function onCancel() {
      this.handleAction('cancel');
    },
    onClickOverlay: function onClickOverlay() {
      this.onClose('overlay');
    },
    handleAction: function handleAction(action) {
      if (this.data.asyncClose) {
        this.set({
          ["loading." + action]: true
        });
      }

      this.onClose(action);
    },
    close: function close() {
      this.set({
        show: false
      });
    },
    stopLoading: function stopLoading() {
      this.set({
        loading: {
          confirm: false,
          cancel: false
        }
      });
    },
    onClose: function onClose(action) {
      if (!this.data.asyncClose) {
        this.close();
      }

      this.$emit('close', action); //把 dialog 实例传递出去，可以通过 stopLoading() 在外部关闭按钮的 loading

      this.$emit(action, {
        dialog: this
      });
      var callback = this.data[action === 'confirm' ? 'onConfirm' : 'onCancel'];

      if (callback) {
        callback(this);
      }
    }
  }
});