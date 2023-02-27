import { useParent } from '../common/relation';
import { VantComponent } from '../common/component';
import { Option } from './shared';

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
    rootPortal: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    transition: true,
    showPopup: false,
    showWrapper: false,
    displayTitle: '',
    safeAreaTabBar: false,
  },

  methods: {
    rerender() {
      wx.nextTick(() => {
        this.parent?.updateItemListData();
      });
    },

    updateDataFromParent() {
      if (this.parent) {
        const {
          overlay,
          duration,
          activeColor,
          closeOnClickOverlay,
          direction,
          safeAreaTabBar,
        } = this.parent.data;

        this.setData({
          overlay,
          duration,
          activeColor,
          closeOnClickOverlay,
          direction,
          safeAreaTabBar,
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

    onOptionTap(event: WechatMiniprogram.TouchEvent) {
      const { option } = event.currentTarget.dataset;
      const { value } = option as unknown as Option;

      const shouldEmitChange = this.data.value !== value;
      this.setData({ showPopup: false, value });
      this.$emit('close');

      this.rerender();

      if (shouldEmitChange) {
        this.$emit('change', value);
      }
    },

    toggle(show?: boolean, options: { immediate?: boolean } = {}) {
      const { showPopup } = this.data;

      if (typeof show !== 'boolean') {
        show = !showPopup;
      }

      if (show === showPopup) {
        return;
      }

      this.onBeforeToggle(show).then((status) => {
        if (!status) {
          return;
        }

        this.setData({
          transition: !options.immediate,
          showPopup: show,
        });

        if (show) {
          this.parent?.getChildWrapperStyle().then((wrapperStyle: string) => {
            this.setData({ wrapperStyle, showWrapper: true });
            this.rerender();
          });
        } else {
          this.rerender();
        }
      });
    },
    onBeforeToggle(status: boolean): Promise<boolean> {
      const { useBeforeToggle } = this.data;

      if (!useBeforeToggle) {
        return Promise.resolve(true);
      }

      return new Promise((resolve) => {
        this.$emit('before-toggle', {
          status,
          callback: (value: boolean) => resolve(value),
        });
      });
    },
  },
});
