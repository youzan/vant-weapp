import { VantComponent } from '../common/component';
import { isImageFile, isVideo } from './utils';

VantComponent({
  props: {
    disabled: Boolean,
    multiple: Boolean,
    uploadText: String,
    useBeforeRead: Boolean,
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
    sizeType: {
      type: Array,
      value: ['original', 'compressed']
    },
    capture: {
      type: Array,
      value: ['album', 'camera']
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
    camera: {
      type: String,
      value: 'back'
    },
    compressed: {
      type: Boolean,
      value: true
    },
    maxDuration: {
      type: Number,
      value: 60
    }
  },

  data: {
    lists: [],
    computedPreviewSize: '',
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

    startUpload() {
      if (this.data.disabled) return;
      const {
        name = '',
        capture,
        maxCount,
        multiple,
        maxSize,
        accept,
        sizeType,
        lists,
        camera,
        compressed,
        maxDuration,
        useBeforeRead = false // 是否定义了 beforeRead
      } = this.data;

      let chooseFile = null;
      const newMaxCount = maxCount - lists.length;
      // 设置为只选择图片的时候使用 chooseImage 来实现
      if (accept === 'image') {
        chooseFile = new Promise((resolve, reject) => {
          wx.chooseImage({
            count: multiple ? (newMaxCount > 9 ? 9 : newMaxCount) : 1, // 最多可以选择的数量，如果不支持多选则数量为1
            sourceType: capture, // 选择图片的来源，相册还是相机
            sizeType,
            success: resolve,
            fail: reject
          });
        });
      } else if (accept === 'video') {
        chooseFile = new Promise((resolve, reject) => {
          wx.chooseVideo({
            sourceType: capture,
            compressed,
            maxDuration,
            camera,
            success: resolve,
            fail: reject
          });
        });
      } else {
        chooseFile = new Promise((resolve, reject) => {
          wx.chooseMessageFile({
            count: multiple ? newMaxCount : 1, // 最多可以选择的数量，如果不支持多选则数量为1
            type: 'file',
            success: resolve,
            fail: reject
          });
        });
      }

      chooseFile
        .then(
          (
            res:
              | WechatMiniprogram.ChooseImageSuccessCallbackResult
              | WechatMiniprogram.ChooseMessageFileSuccessCallbackResult
              | WechatMiniprogram.ChooseVideoSuccessCallbackResult
          ) => {
            let file = null;

            if (isVideo(res, accept)) {
              file = {
                path: res.tempFilePath,
                ...res
              };
            } else {
              file = multiple ? res.tempFiles : res.tempFiles[0];
            }

            // 检查文件大小
            if (file instanceof Array) {
              const sizeEnable = file.every(item => item.size <= maxSize);
              if (!sizeEnable) {
                this.$emit('oversize', { name });
                return;
              }
            } else if (file.size > maxSize) {
              this.$emit('oversize', { name });
              return;
            }

            // 触发上传之前的钩子函数
            if (useBeforeRead) {
              this.$emit('before-read', {
                file,
                name,
                callback: (result: boolean) => {
                  if (result) {
                    // 开始上传
                    this.$emit('after-read', { file, name });
                  }
                }
              });
            } else {
              this.$emit('after-read', { file, name });
            }
          }
        )
        .catch(error => {
          this.$emit('error', error);
        });
    },

    deleteItem(event) {
      const { index } = event.currentTarget.dataset;
      this.$emit('delete', { index, name: this.data.name });
    },

    doPreviewImage(event) {
      if (!this.data.previewFullImage) return;
      const curUrl = event.currentTarget.dataset.url;
      const images = this.data.lists
        .filter(item => item.isImage)
        .map(item => item.url || item.path);

      this.$emit('click-preview', { url: curUrl, name: this.data.name });

      wx.previewImage({
        urls: images,
        current: curUrl,
        fail() {
          wx.showToast({ title: '预览图片失败', icon: 'none' });
        }
      });
    }
  }
});
