import { VantComponent } from '../common/component';
import { isImageFile, isVideo, chooseFile, isPromise } from './utils';
import { chooseImageProps, chooseVideoProps } from './shared';

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
      value: 90
    },
    name: {
      type: [Number, String],
      value: ''
    },
    accept: {
      type: String,
      value: 'image'
    },
    fileList: {
      type: Array,
      value: [],
      observer: 'formatFileList'
    },
    maxSize: {
      type: Number,
      value: Number.MAX_VALUE
    },
    maxCount: {
      type: Number,
      value: 100
    },
    deletable: {
      type: Boolean,
      value: true
    },
    showUpload: {
      type: Boolean,
      value: true
    },
    previewImage: {
      type: Boolean,
      value: true
    },
    previewFullImage: {
      type: Boolean,
      value: true
    },
    imageFit: {
      type: String,
      value: 'scaleToFill'
    },
    uploadIcon: {
      type: String,
      value: 'photograph'
    },
    ...chooseImageProps,
    ...chooseVideoProps
  },

  data: {
    lists: [],
    isInCount: true
  },

  methods: {
    formatFileList() {
      const { fileList = [], maxCount } = this.data;
      const lists = fileList.map(item => ({
        ...item,
        isImage:
          typeof item.isImage === 'undefined' ? isImageFile(item) : item.isImage
      }));
      this.setData({ lists, isInCount: lists.length < maxCount });
    },

    getDetail(index) {
      return {
        name: this.data.name,
        index: index == null ? this.data.fileList.length : index
      };
    },

    startUpload() {
      const { maxCount, multiple, accept, lists, disabled } = this.data;

      if (disabled) return;

      chooseFile({
        ...this.data,
        maxCount: maxCount - lists.length
      })
        .then(res => {
          let file = null;

          if (isVideo(res, accept)) {
            file = {
              path: res.tempFilePath,
              ...res
            };
          } else {
            file = multiple ? res.tempFiles : res.tempFiles[0];
          }

          this.onBeforeRead(file);
        })
        .catch(error => {
          this.$emit('error', error);
        });
    },

    onBeforeRead(file) {
      const { beforeRead, useBeforeRead } = this.data;
      let res: boolean | Promise<any> = true;

      if (typeof beforeRead === 'function') {
        res = beforeRead(file, this.getDetail());
      }

      if (useBeforeRead) {
        res = new Promise((resolve, reject) => {
          this.$emit('before-read', {
            file,
            ...this.getDetail(),
            callback: (ok: boolean) => {
              ok ? resolve() : reject();
            }
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
      const { maxSize } = this.data;
      const oversize = Array.isArray(file)
        ? file.some(item => item.size > maxSize)
        : file.size > maxSize;

      if (oversize) {
        this.$emit('oversize', { file, ...this.getDetail() });
        return;
      }

      if (typeof this.data.afterRead === 'function') {
        this.data.afterRead(file, this.getDetail());
      }

      this.$emit('after-read', { file, ...this.getDetail() });
    },

    deleteItem(event) {
      const { index } = event.currentTarget.dataset;

      this.$emit('delete', {
        ...this.getDetail(index),
        file: this.data.fileList[index]
      });
    },

    onPreviewImage(event) {
      const { index } = event.currentTarget.dataset;
      const { lists } = this.data;
      const item = lists[index];

      this.$emit('click-preview', {
        url: item.url || item.path,
        ...this.getDetail(index)
      });

      if (!this.data.previewFullImage) return;

      wx.previewImage({
        urls: lists
          .filter(item => item.isImage)
          .map(item => item.url || item.path),
        current: item.url || item.path,
        fail() {
          wx.showToast({ title: '预览图片失败', icon: 'none' });
        }
      });
    }
  }
});
