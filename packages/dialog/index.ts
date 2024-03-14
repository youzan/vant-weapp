import { VantComponent } from '../common/component';
import { button } from '../mixins/button';
import { toPromise } from '../common/utils';
import type { Action } from './dialog';

VantComponent({
  mixins: [button],
  classes: ['cancle-button-class', 'confirm-button-class'],

  props: {
    show: {
      type: Boolean,
      observer(show: boolean) {
        !show && this.stopLoading();
      },
    },
    title: String,
    message: String,
    theme: {
      type: String,
      value: 'default',
    },
    confirmButtonId: String,
    className: String,
    customStyle: String,
    asyncClose: Boolean,
    messageAlign: String,
    beforeClose: null,
    overlayStyle: String,
    useSlot: Boolean,
    useTitleSlot: Boolean,
    useConfirmButtonSlot: Boolean,
    useCancelButtonSlot: Boolean,
    showCancelButton: Boolean,
    closeOnClickOverlay: Boolean,
    confirmButtonOpenType: String,
    width: null,
    zIndex: {
      type: Number,
      value: 2000,
    },
    confirmButtonText: {
      type: String,
      value: '确认',
    },
    cancelButtonText: {
      type: String,
      value: '取消',
    },
    confirmButtonColor: {
      type: String,
      value: '',
    },
    cancelButtonColor: {
      type: String,
      value: '',
    },
    showConfirmButton: {
      type: Boolean,
      value: true,
    },
    overlay: {
      type: Boolean,
      value: true,
    },
    transition: {
      type: String,
      value: 'scale',
    },
    rootPortal: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    loading: {
      confirm: false,
      cancel: false,
    },
    callback: (() => {}) as unknown as (
      action: string,
      context: WechatMiniprogram.Component.TrivialInstance
    ) => void,
  },

  methods: {
    onConfirm() {
      this.handleAction('confirm');
    },

    onCancel() {
      this.handleAction('cancel');
    },

    onClickOverlay() {
      this.close('overlay');
    },

    close(action) {
      this.setData({ show: false });

      wx.nextTick(() => {
        this.$emit('close', action);

        const { callback } = this.data;
        if (callback) {
          callback(action, this);
        }
      });
    },

    stopLoading() {
      this.setData({
        loading: {
          confirm: false,
          cancel: false,
        },
      });
    },

    handleAction(action: Action) {
      this.$emit(action, { dialog: this });

      const { asyncClose, beforeClose } = this.data;
      if (!asyncClose && !beforeClose) {
        this.close(action);
        return;
      }

      this.setData({
        [`loading.${action}`]: true,
      });

      if (beforeClose) {
        toPromise(beforeClose(action)).then((value) => {
          if (value) {
            this.close(action);
          } else {
            this.stopLoading();
          }
        });
      }
    },
  },
});
