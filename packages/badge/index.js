const DEFAULT_COLOR = '#fff';
const DEFAULT_BACKGROUND_COLOR = '#f44';
const DEFAULT_FONT_SIZE = 10;
const DEFAULT_BOX_SHADOW = '0 0 0 2px #fff';

Component({
  properties: {
    color: {
      type: String,
      value: DEFAULT_COLOR
    },
    backgroundColor: {
      type: String,
      value: DEFAULT_BACKGROUND_COLOR
    },
    fontSize: {
      type: Number,
      value: DEFAULT_FONT_SIZE
    },
    boxShadow: {
      type: String,
      value: DEFAULT_BOX_SHADOW
    }
  }
});
