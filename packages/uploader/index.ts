import { VantComponent } from '../common/component';
import { isImageFile, chooseFile, isVideoFile, File } from './utils';
import { chooseImageProps, chooseVideoProps } from './shared';
import { isBoolean, isPromise } from '../common/validator';

VantComponent({
  props: {
    disabled: Boolean,
    multiple: Boolean,
    uploadText: String,
    useBeforeRead: Boolean,
    afterRead: null,
    beforeRead: null,
    previewSize: {
      type: null,
      value: 80,
    },
    name: {
      type: null,
      value: '',
    },
    accept: {
      type: String,
      value: 'image',
    },
    fileList: {
      type: Array,
      value: [],
      observer: 'formatFileList',
    },
    maxSize: {
      type: Number,
      value: Number.MAX_VALUE,
    },
    maxCount: {
      type: Number,
      value: 100,
    },
    deletable: {
      type: Boolean,
      value: true,
    },
    showUpload: {
      type: Boolean,
      value: true,
    },
    previewImage: {
      type: Boolean,
      value: true,
    },
    previewFullImage: {
      type: Boolean,
      value: true,
    },
    imageFit: {
      type: String,
      value: 'scaleToFill',
    },
    uploadIcon: {
      type: String,
      value: 'photograph',
    },
    ...chooseImageProps,
    ...chooseVideoProps,
  },

  data: {
    lists: [] as File[],
    isInCount: true,
  },

  methods: {
    formatFileList() {
      const { fileList = [], maxCount } = this.data;
      const lists = fileList.map((item) => ({
        ...item,
        isImage: isImageFile(item),
        isVideo: isVideoFile(item),
        deletable: isBoolean(item.deletable) ? item.deletable : true,
      }));

      this.setData({ lists, isInCount: lists.length < maxCount });
    },

    getDetail(index?: number) {
      return {
        name: this.data.name,
        index: index == null ? this.data.fileList.length : index,
      };
    },

    startUpload() {
      const { maxCount, multiple, lists, disabled } = this.data;

      if (disabled) return;

      chooseFile({
        ...this.data,
        maxCount: maxCount - lists.length,
      })
        .then((res) => {
          this.onBeforeRead(multiple ? res : res[0]);
        })
        .catch((error) => {
          this.$emit('error', error);
        });
    },

    onBeforeRead(file: File) {
      const { beforeRead, useBeforeRead } = this.data;
      let res: boolean | Promise<void> = true;

      if (typeof beforeRead === 'function') {
        res = beforeRead(file, this.getDetail());
      }

      if (useBeforeRead) {
        res = new Promise<void>((resolve, reject) => {
          this.$emit('before-read', {
            file,
            ...this.getDetail(),
            callback: (ok: boolean) => {
              ok ? resolve() : reject();
            },
          });
        });
      }

      if (!res) {
        return;
      }

      if (isPromise(res)) {
        res.then((data: any) => this.onAfterRead(data || file));
      } else {
        this.onAfterRead(file);
      }
    },

    onAfterRead(file) {
      const { maxSize, afterRead } = this.data;
      const oversize = Array.isArray(file)
        ? file.some((item) => item.size > maxSize)
        : file.size > maxSize;

      if (oversize) {
        this.$emit('oversize', { file, ...this.getDetail() });
        return;
      }

      if (typeof afterRead === 'function') {
        afterRead(file, this.getDetail());
      }

      this.$emit('after-read', { file, ...this.getDetail() });
    },

    deleteItem(event) {
      const { index } = event.currentTarget.dataset;

      this.$emit('delete', {
        ...this.getDetail(index),
        file: this.data.fileList[index],
      });
    },

    onPreviewImage(event) {
      if (!this.data.previewFullImage) return;

      const { index } = event.currentTarget.dataset;
      const { lists } = this.data;
      const item = lists[index];

      wx.previewImage({
        urls: lists.filter((item) => isImageFile(item)).map((item) => item.url),
        current: item.url,
        fail() {
          wx.showToast({ title: '预览图片失败', icon: 'none' });
        },
      });
    },

    onPreviewVideo(event) {
      if (!this.data.previewFullImage) return;
      const { index } = event.currentTarget.dataset;
      const { lists } = this.data as { lists: File[] };

      wx.previewMedia({
        sources: lists
          .filter((item) => isVideoFile(item))
          .map((item) => ({
            ...item,
            type: 'video',
          })),
        current: index,
        fail() {
          wx.showToast({ title: '预览视频失败', icon: 'none' });
        },
      });
    },

    onPreviewFile(event: WechatMiniprogram.TouchEvent) {
      const { index } = event.currentTarget.dataset;

      wx.openDocument({
        filePath: this.data.lists[index].url,
        showMenu: true,
      });
    },

    onClickPreview(event) {
      const { index } = event.currentTarget.dataset;
      const item: File = this.data.lists[index];

      this.$emit('click-preview', {
        ...item,
        ...this.getDetail(index),
      });
    },
  },
});
