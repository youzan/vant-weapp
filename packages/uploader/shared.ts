// props for choose image
export const chooseImageProps = {
  sizeType: {
    type: Array,
    value: ['original', 'compressed'],
  },
  capture: {
    type: Array,
    value: ['album', 'camera'],
  },
};

// props for choose video
export const chooseVideoProps = {
  capture: {
    type: Array,
    value: ['album', 'camera'],
  },
  compressed: {
    type: Boolean,
    value: true,
  },
  maxDuration: {
    type: Number,
    value: 60,
  },
  camera: {
    type: String,
    value: 'back',
  },
};
