import { VantComponent } from '../common/component';

const defaultLoadingSize = '30px';
VantComponent({
  props: {
    size: {
      type: String,
      value: defaultLoadingSize,
      observer: 'normalizeSize'
    },

    type: {
      type: String,
      value: 'circular'
    },
    color: {
      type: String,
      value: '#c9c9c9'
    }
  },

  data: {
    loadingSize: defaultLoadingSize
  },

  methods: {
    // 支持 size="10" 和 size="10px" size="10rpx" 这些格式, 显然也不需要理会 size="abcpx"
    normalizeSize(size: string | number): void {
      const numberLike = (s: string) => !Number.isNaN(+s);
      let loadingSize = size;
      if (typeof size === 'number' || numberLike(size)) {
        loadingSize = size + 'px';
      }

      this.setData({
        loadingSize
      });
    }
  }
});
