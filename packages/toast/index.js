import Toast from './toast';

Component({
  properties: {
    mask: Boolean,
    message: String,
    type: {
      type: String,
      value: 'text'
    },
    loadingType: {
      type: String,
      value: 'circular'
    },
    position: {
      type: String,
      value: 'middle'
    }
  }
});

export default Toast;
