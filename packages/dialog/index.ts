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
    }
  },

  data: {
    loading: {
      confirm: false,
      cancel: false
    }
  },

  watch: {
    show(show) {
      !show && this.stopLoading();
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
      this.setData({
        show: false
      });
    },

    stopLoading() {
      this.setData({
        loading: {
          confirm: false,
          cancel: false
        }
      });
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
